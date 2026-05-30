# Handoff: Agentic Coding talk (NDC 2026 CPH)

Working notes so you can pick this up later. The deck is `slides.md`.

## What this talk is

- 15 minute lightning talk.
- Audience: people fairly new to agentic tools (Claude Code, OpenCode, etc.) who want to get into it.
- Scandinavian crowd, you're Norwegian. Keep the language dry and understated, not American or sensationalized.
- Goal: kill the FOMO by explaining the basics. The fancy stuff is just text. Models, suppliers, and harnesses are three separate things.
- No em dashes anywhere. Use commas, colons, periods, or parentheses.
- "Vibe coding" framing was dropped (was only relevant when the talk was first submitted).
- Images are handmade and added later. Slides still reference old placeholder image files with TODO comments; swap them when ready. `evolution.png` is now orphaned (timeline slide was cut), so it's free to reuse.

## Current structure (12 slides)

1. Cover
2. Statement: "You're not behind." (+ reveal: "This is smaller than it looks.")
3. "It's actually three things" (model + harness are primary; supplier is a parenthetical aside. Ends on "Agent = model + harness")
4. The model: it's just text
5. The harness: what makes it act
6. A tool call, up close (two-col: trimmed TS script + real JSON output; punchline "the model never touched the disk")
7. Break slide: "Now we know the parts. How do we use them?"
8. Context engineering
9. AGENTS.md, CLAUDE.md, Skills (it's just markdown, nothing magical)
10. Feedback loops + your role shifts (two-col)
11. "So why isn't Claude Code the future?" (closed bundle argument, lands on Pi)
12. Takeaway

The timeline / "How we got here" slide was cut. You'll mention the history briefly out loud instead.

The dedicated supplier slide was cut: supplier overweighted the one leg that isn't part of the agent (agent = model + harness). It now lives as a parenthetical on slide 3 and resurfaces only at the closer (pricing-enforced supplier lock). scope.png and evolution.png are both orphaned now, free to reuse.

Tool-calling slide: runnable script is snippets/tool-calling.ts (read_file tool, asks "what's in package.json?", prints the tool_calls JSON). Verified working against the real API. The slide's code is a hand-trimmed copy for readability, not a live <<< embed. Models are post-trained to emit tool calls; good verbal point that the model emits text/JSON and the harness executes. NOTE: openai was added to package.json as a dependency.

## THE BIG DECISION (RESOLVED)

Resolved: demystification is the headline, empowerment is the earned conclusion.
- Opener (slide 2) is now "You're not behind." / "This is smaller than it looks."
- The "Claude Code is not the future" claim lives only as the closer (slide 11).

Original reasoning kept below for context.

The talk mixed two theses and the seam showed:

1. Descriptive/educational: "harnesses aren't as complicated as you think." This is the whole body and matches your original goal (newcomers, kill FOMO).
2. Prescriptive/opinionated: "the future should let users pick their own model, supplier, and harness." This is advocacy.

They are not two talks IF one is the cause of the other:
> It's three separable, text-based parts (thesis 1), therefore you shouldn't be locked into one welded bundle, therefore the future is picking your own (thesis 2).

Thesis 2 is the conclusion you earn from thesis 1. The real question is just which one is the headline.

**Recommendation: demystification as the headline, empowerment as the earned conclusion.**
- Swap the current bold opener (slide 2, "Claude Code is not the future") back to a FOMO / demystification hook.
- Keep the "Claude Code is not the future / pick your own" claim as the CLOSING payoff (slide 11), where you've earned it. It hits harder at minute 12 than at minute 0, because by then the audience has the mental model to see why it matters.
- This is truer to the stated audience and goal.

Alternative if you'd rather keep the provocative opener: explicitly reframe the middle as evidence ("here's why it's three separable things") so the demystification reads as serving the argument, not as a tangent.

Decision is unmade. Was about to swap the opener when we stopped.

## Keep the Claude Code argument FAIR and precise

When arguing "Claude Code is not the future", don't make it a hit piece. The honest, defensible version:
- Claude Code is excellent, but it's one company's closed bundle.
- It couples a closed harness to one model family. You can't open it up, can't freely swap the brain, can't see or change what it does with your tokens.
- Supplier axis: yes, technically you can point Claude Code at Bedrock/Vertex. But the economics make that a non-option for most. The value is in Anthropic's subscription (Pro/Max), and usage-based pricing through the cloud providers is expensive. So in practice you're tied to Anthropic as the supplier too. The coupling is real, just enforced by pricing rather than by code. (This makes the supplier-lock point stronger, not weaker, so you can lean into it, you're not overclaiming.)
- The point isn't "it's bad", it's "no single closed bundle is the future; composability is."

Pi (https://pi.dev) is the anchor for the future slide: minimal by design, you assemble the rest. "Features that other agents bake in, you can build yourself." Shows you what the model sees and where your tokens go. Tokens matter as a resource for now and probably a while. Not a recommendation, a direction worth watching.

## Other notes / smaller TODOs

- AGENTS.md / Skills slide: the message is people have heard of these and think they're a new format to learn, but they're just markdown the harness reads. Plain text in a file the agent happens to read.
- Context engineering: keep the "you learn this by using a tool on real work, not by reading about it" line. Giving good context is the skill of the era.
- "How to get started" is intentionally light / mindset only, not practical step-by-step. Mostly folded into the takeaway ("pick a tool, use it on a real project, learn by steering it").
- Multimodal is deliberately scoped out (the "it's just text" framing).
- Blog post `claude-code-is-not-the-future.md` exists in the blog but you've decided NOT to write it (no time). Don't reference it in the talk.

## Timing

12 slides for ~15 min is comfortable (~1 min each) with slack. Don't add more. If anything, slow down on the harness slide, it's the most important concept and currently the quietest.

## Commands

```bash
bun dev          # dev server at http://localhost:3030
bun run build    # build to dist/
bun run export   # export to PDF/images
```
