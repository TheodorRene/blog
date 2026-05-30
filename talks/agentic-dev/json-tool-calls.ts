/**
 * JSON Tool Calls — "X-ray mode" for a live agentic-coding demo.
 *
 * Companion to the talk "The Fundamentals of Agentic Coding".
 *
 * The point of the talk: a model is just text-in / text-out. When it "uses a
 * tool", it does not touch your disk — it emits a chunk of JSON, and the
 * *harness* does the rest. This extension makes that visible.
 *
 * It re-registers each built-in tool (read, bash, edit, write, grep, find, ls)
 * under the same name. Per the extension API, registering a tool with the same
 * name as a built-in *replaces it entirely* — so we delegate execute() to the
 * original implementation (behaviour is unchanged) and only override the
 * rendering:
 *
 *   renderCall   -> the raw JSON the MODEL produced (OpenAI tool_calls shape),
 *                   exactly like the slide.
 *   renderResult -> a one-line summary; press ctrl+o to expand into the JSON
 *                   tool result that the HARNESS feeds back to the model.
 *
 * Because we only change rendering (not the message stream), there is zero
 * impact on what the model sees and no risk of breaking tool_use/tool_result
 * pairing. Safe to run live.
 *
 * Usage:
 *   pi -e ./json-tool-calls.ts
 *
 * On startup it also prints the two hidden inputs the harness sends the model,
 * top to bottom: the system prompt (the instructions), then the tool
 * definitions — the `tools` array (the "contract") of what it can call.
 *
 * While running:
 *   /json    toggle X-ray mode on/off for subsequent tool calls
 *   /tools   re-show the tool definitions sent to the model
 *   /system  show the system prompt (the hidden instructions sent to the model)
 */

import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import {
	// The *Definition factories return the full ToolDefinition (with
	// promptSnippet/promptGuidelines). The plain create*Tool wrappers drop those,
	// which would leave the system prompt's "Available tools" section empty.
	createBashToolDefinition,
	createEditToolDefinition,
	createFindToolDefinition,
	createGrepToolDefinition,
	createLsToolDefinition,
	createReadToolDefinition,
	createWriteToolDefinition,
} from "@earendil-works/pi-coding-agent";
import { Box, Text } from "@earendil-works/pi-tui";

export default function (pi: ExtensionAPI) {
	const cwd = process.cwd();

	// X-ray mode is on by default. /json flips it for subsequent tool calls.
	let enabled = true;

	// ---- tiny JSON syntax highlighter (returns a string with inline ANSI) ----
	// theme.fg(color, text) wraps text in ANSI colour codes; Text renders those
	// verbatim, so we can build one colourised string and hand it over.
	function colorizeJson(json: string, theme: any): string {
		const tokens = /("(?:[^"\\]|\\.)*"\s*:)|("(?:[^"\\]|\\.)*")|(-?\d+(?:\.\d+)?)|(\btrue\b|\bfalse\b|\bnull\b)/g;
		return json.replace(tokens, (match, key, str, num, lit) => {
			if (key) return theme.fg("accent", match); // object keys
			if (str) return theme.fg("success", match); // string values
			if (num) return theme.fg("warning", match); // numbers
			if (lit) return theme.fg("warning", match); // true / false / null
			return match;
		});
	}

	function jsonBox(theme: any, headerText: string, body: string): Box {
		const box = new Box(1, 1, (t: string) => theme.bg("customMessageBg", t));
		box.addChild(new Text(theme.fg("toolTitle", theme.bold(headerText)), 0, 0));
		box.addChild(new Text(colorizeJson(body, theme), 0, 0));
		return box;
	}

	// What the model actually emitted: one entry of the `tool_calls` array.
	// Mirrors the slide: { id, type, function: { name, arguments } } where
	// `arguments` is itself a JSON *string*.
	function renderToolCallJson(toolName: string, args: unknown, toolCallId: string, theme: any) {
		const toolCall = {
			id: toolCallId,
			type: "function",
			function: {
				name: toolName,
				arguments: JSON.stringify(args ?? {}),
			},
		};
		return jsonBox(
			theme,
			"▶ tool call — text the model produced (it never touched the disk):",
			JSON.stringify(toolCall, null, 2),
		);
	}

	// What the harness sends back to the model after executing the tool.
	function renderToolResultJson(toolCallId: string, result: any, theme: any, expanded: boolean) {
		const content = result?.content?.[0];
		const text = content?.type === "text" ? content.text : `[${content?.type ?? "no"} content]`;
		const charCount = typeof text === "string" ? text.length : 0;

		if (!expanded) {
			return new Text(
				theme.fg("dim", `↩ result → model · ${charCount} chars · ctrl+o for JSON`),
				0,
				0,
			);
		}

		const MAX = 1500;
		const shown = typeof text === "string" && text.length > MAX ? `${text.slice(0, MAX)}\n…(${text.length - MAX} more chars)` : text;
		const resultMsg = {
			role: "tool",
			tool_call_id: toolCallId,
			content: shown,
		};
		return jsonBox(
			theme,
			"↩ tool result — text the harness feeds back to the model:",
			JSON.stringify(resultMsg, null, 2),
		);
	}

	// Compact fallback rendering when X-ray mode is toggled off, so the demo can
	// flip between "just JSON" and a normal-looking line without restarting.
	function renderCompactCall(toolName: string, args: any, theme: any) {
		const hint = args?.path ?? args?.command ?? args?.pattern ?? "";
		let text = theme.fg("toolTitle", theme.bold(`${toolName} `));
		if (hint) text += theme.fg("accent", String(hint));
		return new Text(text, 0, 0);
	}

	// Build a replacement tool definition that delegates execution and renders JSON.
	function wrap(name: string, original: any) {
		pi.registerTool({
			name,
			label: name,
			description: original.description,
			parameters: original.parameters,
			// Preserve the originals' prompt contributions so the system prompt
			// still lists these tools (otherwise "Available tools" goes empty).
			promptSnippet: original.promptSnippet,
			promptGuidelines: original.promptGuidelines,
			// Let us draw our own outer frame so the JSON box stands alone.
			renderShell: "self",
			async execute(toolCallId, params, signal, onUpdate, ctx) {
				return original.execute(toolCallId, params, signal, onUpdate, ctx);
			},
			renderCall(args, theme, context) {
				if (!enabled) return renderCompactCall(name, args, theme);
				return renderToolCallJson(name, args, context.toolCallId, theme);
			},
			renderResult(result, { expanded }, theme, context) {
				if (!enabled) {
					const isErr = (result as any)?.isError;
					return new Text(theme.fg(isErr ? "error" : "dim", isErr ? "error" : "done"), 0, 0);
				}
				return renderToolResultJson(context.toolCallId, result, theme, expanded);
			},
		});
	}

	wrap("read", createReadToolDefinition(cwd));
	wrap("bash", createBashToolDefinition(cwd));
	wrap("edit", createEditToolDefinition(cwd));
	wrap("write", createWriteToolDefinition(cwd));
	wrap("grep", createGrepToolDefinition(cwd));
	wrap("find", createFindToolDefinition(cwd));
	wrap("ls", createLsToolDefinition(cwd));

	// ---- tool definitions: the "contract" the harness sends the model ----
	// Before the model can call a tool, the harness tells it which tools exist
	// and the exact JSON shape each one expects. That's the `tools` array in the
	// request (slide: "A tool call, up close"). We surface it on startup.
	//
	// We render it from `details` (NOT sent to the model) with a tiny `content`
	// string, so showing the contract doesn't itself pollute the context.
	function firstLine(text: string): string {
		const line = (text ?? "").split("\n")[0].trim();
		return line.length > 100 ? `${line.slice(0, 100)}…` : line;
	}

	pi.registerMessageRenderer("tool-defs-xray", (message, { expanded }, theme) => {
		const d = message.details as { count: number; tools: any[] } | undefined;
		if (!d) return undefined;

		// Reconstruct the OpenAI `tools` array shape from the captured definitions.
		const openai = d.tools.map((t) => ({
			type: "function",
			function: {
				name: t.name,
				description: expanded ? t.description : firstLine(t.description),
				parameters: t.parameters,
			},
		}));

		const header = `▤ ${d.count} tool definitions — the contract sent to the model (it must answer with one of these, as JSON):`;
		const box = jsonBox(theme, header, JSON.stringify(openai, null, 2));
		if (!expanded) box.addChild(new Text(theme.fg("dim", "ctrl+o for full tool descriptions"), 0, 0));
		return box;
	});

	function showToolDefs() {
		const active = new Set(pi.getActiveTools());
		const tools = pi
			.getAllTools()
			.filter((t) => active.has(t.name))
			.map((t) => ({ name: t.name, description: t.description, parameters: t.parameters }));
		pi.sendMessage({
			customType: "tool-defs-xray",
			content: "[tool definitions shown in X-ray view]",
			display: true,
			details: { count: tools.length, tools },
		});
	}

	// ---- system prompt: the hidden instructions the harness prepends ----
	// Before your first word, the harness sends the model a system prompt: base
	// instructions plus folded-in context (AGENTS.md / CLAUDE.md, tool guidance,
	// environment). "The agent only knows what you give it" — this is what we
	// gave it. Rendered from `details` so revealing it doesn't pollute context.
	const SYS_PREVIEW_LINES = 24;
	pi.registerMessageRenderer("system-prompt-xray", (message, { expanded }, theme) => {
		const d = message.details as { prompt: string; chars: number; lines: number } | undefined;
		if (!d) return undefined;

		const header = `◆ system prompt — the hidden instructions sent to the model (${d.lines} lines, ${d.chars} chars), before you type anything:`;
		const box = new Box(1, 1, (t: string) => theme.bg("customMessageBg", t));
		box.addChild(new Text(theme.fg("toolTitle", theme.bold(header)), 0, 0));

		const lines = d.prompt.split("\n");
		const shown = expanded ? lines : lines.slice(0, SYS_PREVIEW_LINES);
		box.addChild(new Text(theme.fg("dim", shown.join("\n")), 0, 0));
		if (!expanded && lines.length > SYS_PREVIEW_LINES) {
			box.addChild(
				new Text(theme.fg("warning", `… ${lines.length - SYS_PREVIEW_LINES} more lines — ctrl+o for the full system prompt`), 0, 0),
			);
		}
		return box;
	});

	function showSystemPrompt(ctx: any) {
		const prompt = ctx.getSystemPrompt();
		pi.sendMessage({
			customType: "system-prompt-xray",
			content: "[system prompt shown in X-ray view]",
			display: true,
			details: { prompt, chars: prompt.length, lines: prompt.split("\n").length },
		});
	}

	// Status widget so the room (and you) can see X-ray mode is active.
	function updateWidget(ctx: any) {
		if (!ctx?.ui) return;
		ctx.ui.setWidget(
			"json-xray",
			enabled
				? ["▶ JSON tool-call X-ray: ON  —  every tool call is shown as the raw JSON the model emitted  (/json to toggle)"]
				: ["JSON tool-call X-ray: off  (/json to toggle)"],
		);
	}

	pi.on("session_start", async (event, ctx) => {
		updateWidget(ctx);
		// On first open, print the hidden inputs the harness sends the model,
		// top to bottom: the system prompt, then the tool definitions. Tool
		// calls/results then appear below as the conversation proceeds.
		if (enabled && ctx.hasUI && (event.reason === "startup" || event.reason === "new")) {
			showSystemPrompt(ctx);
			showToolDefs();
		}
	});

	pi.registerCommand("json", {
		description: "Toggle JSON tool-call X-ray mode for subsequent tool calls",
		handler: async (_args, ctx) => {
			enabled = !enabled;
			updateWidget(ctx);
			ctx.ui.notify(`JSON tool-call X-ray ${enabled ? "ON" : "off"}`, "info");
		},
	});

	pi.registerCommand("tools", {
		description: "Show the tool definitions (the contract) sent to the model",
		handler: async (_args, _ctx) => {
			showToolDefs();
		},
	});

	pi.registerCommand("system", {
		description: "Show the system prompt (the hidden instructions sent to the model)",
		handler: async (_args, ctx) => {
			showSystemPrompt(ctx);
		},
	});
}
