---
name: agent-xray-demo
description: A short live-demo skill for explaining how coding agents work with JSON tool calls. Use when presenting the json-tool-calls.ts X-ray extension or when asked to demonstrate how an agent plans, emits tool-call JSON, waits for the harness, and uses tool results.
---

# Agent X-ray Demo

Use this skill to give a tiny, safe, repeatable demo of how an agent works while `json-tool-calls.ts` is enabled.

## Goal

Make the hidden loop visible:

1. The user asks for something.
2. The model decides it needs information.
3. The model emits a JSON tool call.
4. The harness executes the tool.
5. The harness sends the result back.
6. The model continues from the returned text.

## Demo script

When this skill is invoked, do the following:

1. Briefly say what the audience is about to see:
   - "I am only text-in/text-out. When I need the filesystem, I will emit JSON. The harness will do the real work."
2. Make exactly three small, safe tool calls, pausing with one sentence before each call:
   - `ls` the project root.
   - `read` `package.json`.
   - `grep` for `theme:` in `slides.md`.
3. After the three tool calls, summarize what happened in four bullets:
   - what the model decided,
   - what JSON tool calls were emitted,
   - what the harness executed,
   - what information came back into context.

## Constraints

- Do not edit files.
- Do not run long commands.
- Prefer `ls`, `read`, and `grep` so the JSON is easy to understand on screen.
- Keep the spoken explanation concise; the X-ray display is the main teaching aid.
- If `json-tool-calls.ts` is not enabled, mention that the same loop still happens, but the raw JSON is not being rendered.

## Suggested opening

"Let's use a tiny skill to make the agent loop visible. I will inspect this Slidev project using three safe tools. Watch the JSON blocks: those are the tool calls I produce; the harness executes them and feeds the results back to me."
