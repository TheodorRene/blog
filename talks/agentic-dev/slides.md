---
theme: apple-basic
title: The Fundamentals of Agentic Coding (AKA Vibe Coding)
drawings:
  persist: false
mdc: true
favicon: 'images/favicon-32x32.png'
transition: slide-left
layout: intro-image
image: 'images/front.png'
---

<!-- TODO: Replace images/front.png with a cover image -->

<div class="absolute top-10 left-10">
  <span class="font-700">NDC 2026 CPH</span>
</div>

<div class="absolute bottom-10 right-10">

📙 [blog.theodorc.no](https://blog.theodorc.no)
🦋 [@theodorc.no](https://bsky.app/profile/theodorc.no)

</div>

<div class="absolute bottom-10 border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white p-4 rounded-lg">
  <h1>The Fundamentals of Agentic Coding</h1>
  <p>AKA Vibe Coding — Theodor René Carlsen</p>
</div>

---
layout: statement
---

# AI has changed how we write code.

Whether we like it or not.

---
layout: intro-image-right
image: 'images/scope.png'
---

<!-- TODO: Replace images/scope.png with something illustrating focus/clarity -->

# This talk is NOT about

<v-clicks>

- Security or privacy concerns
- How to get access to models
- Which tool is the best
- Replacing you

</v-clicks>

<v-click>

# It IS about

- What these tools can and cannot do
- How the workflow has actually changed
- What is hype, and what is worth your time

</v-click>

---
layout: intro-image-right
image: 'images/evolution.png'
---

<!-- TODO: Replace images/evolution.png with something showing progression/timeline -->

# How we got here

<v-clicks>

- Stack Overflow copy/paste
- ChatGPT generation + copy/paste
- Copilot autocomplete in the editor
- Fully embedded agents in IDEs
- CLI / TUI agents orchestrating across files
- Multiple agents running concurrently

</v-clicks>

---
layout: statement
---

# So what even *is* agentic coding?

---
layout: intro-image-right
image: 'images/text.png'
---

<!-- TODO: Replace images/text.png with something abstract — raw text, tokens, a black box -->

# It's just text

At its core, a model is a black box that is very good at one thing.

<v-clicks>

- It reads text
- It produces text
- That's it

</v-clicks>

<v-click>

Your prompt is text. The code it writes is text. The error message it reads is text. The file it edits is text.

</v-click>

<v-click>

Understanding this removes a lot of the magic — and a lot of the fear.

</v-click>

---
layout: intro-image-right
image: 'images/harness.png'
---

<!-- TODO: Replace images/harness.png with something showing scaffolding, a cockpit, or a control harness -->

# But it has a harness

The model itself is just text in, text out. The harness is what makes it an agent.

<v-clicks>

- Read and write files
- Run shell commands
- Search the codebase
- Call external APIs
- Loop — act, observe, repeat

</v-clicks>

<v-click>

"Vibe coding", "agentic coding" — the terms blur together these days. What they all describe is the same thing: a model with enough tooling around it to take real actions on your behalf.

</v-click>

---
layout: image-right
image: 'images/players.png'
---

<!-- TODO: Replace images/players.png with a landscape/ecosystem image -->

# Players in the field

Not a product comparison — just context.

<v-clicks>

- **Foundation models** — OpenAI, Anthropic, Google, etc. The brains.
- **IDE-embedded agents** — Copilot, Cursor, Windsurf. Lowest friction to get started.
- **CLI / TUI agents** — OpenCode, Claude Code, Aider. More control, scriptable, composable.

</v-clicks>

<v-click>

The space is moving fast. Specific tools matter less than understanding the category.

</v-click>

---
layout: intro-image-right
image: 'images/feedback.png'
---

<!-- TODO: Replace images/feedback.png with something showing loops/iteration -->

# Fast feedback loops

This is where autonomy actually emerges.

<v-clicks>

- The agent runs type checks, tests, linting
- It sees the output and corrects itself
- It iterates without waiting for you
- You come back to a result, not a process

</v-clicks>

<v-click>

Without feedback loops, an agent is just a smarter autocomplete.

</v-click>

---
layout: two-cols
layoutClass: gap-12
---

# Agents working on themselves

When an agent has end-to-end tooling integration, it can close the loop entirely.

<v-clicks>

- Write code → run tests → read failures → fix → repeat
- No manual intervention at each step
- The model is reasoning about its own output

</v-clicks>

::right::

# Your role changes

<v-clicks>

- You no longer supervise every step
- You define the goal and constraints
- You review the outcome
- You course-correct when the context was wrong

</v-clicks>

<v-click>

The bottleneck moves from *writing* to *reviewing and directing*.

</v-click>

---
layout: intro-image-right
image: 'images/context.png'
---

<!-- TODO: Replace images/context.png with something about information/signal -->

# Context engineering

The developer skill of the era.

<v-clicks>

- Agents are smart enough to act autonomously
- But they only know what you give them
- Missing or ambiguous context leads to wrong output — just like with humans

</v-clicks>

<v-click>

The quality of your instructions determines the quality of the result.

</v-click>

---
layout: default
---

# Standards & abstractions

Attempts at making context portable and reusable.

<v-clicks>

- `AGENTS.md` / `CLAUDE.md` / rules files — project-level instructions the agent reads before acting
- "Skills" — reusable workflow snippets
- MCP (Model Context Protocol) — a standard for connecting tools to agents

</v-clicks>

<v-click>

```md
# AGENTS.md

## Commands
- bun run dev       # dev server
- bun run typecheck # type checking

## Guidelines
- Keep components small and focused
- Prefer editing existing files over creating new ones
```

</v-click>

<v-click>

The long-term value of specific formats is unclear. What matters is: **constraints + context**, not which file you put them in.

</v-click>

---
layout: two-cols
layoutClass: gap-12
---

# What actually matters

<v-clicks>

- Fast feedback loops in your project (tests, type checks, linting that actually run)
- Clear, low-ambiguity context for the agent
- A codebase the agent can navigate and modify safely
- Your own ability to review and course-correct

</v-clicks>

::right::

# What matters less

<v-clicks>

- Which specific agent tool you use
- Whether you use MCP or a bash interface
- Perfectly formatted `AGENTS.md` files
- Keeping up with every new release

</v-clicks>

<v-click>

The fundamentals are stable even when the tools aren't.

</v-click>

---
layout: intro-image
image: 'images/final.png'
---

<!-- TODO: Replace images/final.png with a closing/outro image -->

# The Fundamentals of Agentic Coding

<v-clicks>

- The workflow has genuinely changed — the evolution is real
- Agentic = the model acts, observes, and loops
- Feedback loops are where autonomy emerges
- Context engineering is your most important new skill
- The fundamentals matter more than the tools

</v-clicks>

<br />
<br />
<br />
<br />

[blog.theodorc.no](https://blog.theodorc.no) · [@theodorc.no on Bluesky](https://bsky.app/profile/theodorc.no)

<PoweredBySlidev mt-6 />
