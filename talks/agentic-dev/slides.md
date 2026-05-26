---
theme: apple-basic
title: The Fundamentals of Agentic Coding
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
  <p>Theodor René Carlsen</p>
</div>

---
layout: intro-image-right
image: 'images/evolution.png'
---

<!-- TODO: Replace images/evolution.png with something showing progression/timeline -->

# How we got here

AI has changed how we write code — whether we like it or not.

<v-clicks>

- **~2008** — Stack Overflow copy/paste
- **2021** — Copilot autocomplete in the editor
- **2022** — ChatGPT generation + copy/paste
- **2024** — Fully embedded agents in IDEs
- **2025** — CLI / TUI agents orchestrating across files
- **2026** — Multiple agents running concurrently

</v-clicks>

---
layout: image-right
image: 'images/players.png'
---

<!-- TODO: Replace images/players.png with something showing three stacked layers -->

# The pieces

When people say "AI coding tools", they usually mean three different things mashed together.

<v-clicks>

- **Models** — the brain: GPT, Claude, Gemini
- **Suppliers** — where you get the model: OpenAI, Anthropic, GitHub Models, OpenRouter, or Ollama on your own machine
- **Harnesses** — what lets the model actually do things: Claude Code, Cursor, OpenCode, Codex, Antigravity, Aider, Cline, Continue, Zed, Goose, Pi, and on, and on...

</v-clicks>

<v-click>

Same model, different harness. Same harness, different model. There is no single correct combination.

</v-click>

<v-click>

The next two slides go through the model and the harness in turn.

</v-click>

---
layout: intro-image-right
image: 'images/text.png'
---

<!-- TODO: Replace images/text.png with something abstract — raw text, tokens, a black box -->

# The model: it's just text

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

# The harness: what makes it act

The model itself is just text in, text out. The harness wraps it with tools.

<v-clicks>

- Read and write files
- Run shell commands
- Search the codebase
- Call external APIs
- Loop — act, observe, repeat

</v-clicks>

<v-click>

A model with a harness around it is what takes real actions on your behalf.

</v-click>

---
layout: intro-image-right
image: 'images/context.png'
---

<!-- TODO: Replace images/context.png with something about information/signal -->

# Context engineering

The skill that actually matters.

<v-clicks>

- The agent only knows what you give it
- Missing context leads to wrong output — same as with a new colleague
- Good context is concrete: paths, examples, constraints, what *not* to do

</v-clicks>

<v-click>

You will learn this by using a tool on real work. Not by reading about it.

</v-click>

---
layout: default
---

# AGENTS.md, CLAUDE.md, Skills

<v-clicks>

You have probably heard of these. They sound like a new format you need to learn.

They are markdown files the harness reads before it acts — project context, commands, conventions, the things you would otherwise repeat in every prompt.

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

Nothing magical. Plain text, in a file the agent happens to read.

</v-click>

---
layout: two-cols
layoutClass: gap-12
---

# Feedback loops

Where the autonomy actually comes from.

<v-clicks>

- The agent runs your tests, type checks, linters
- It reads the output and corrects itself
- It loops without waiting for you

</v-clicks>

<v-click>

Without these, an agent is glorified autocomplete.

</v-click>

::right::

# Your role shifts

<v-clicks>

- You set the goal and the constraints
- You review the outcome
- You step in when the context was wrong

</v-clicks>

<v-click>

From writing every line to directing and reviewing.

</v-click>

---
layout: default
---

# A guess at where this is going

<v-clicks>

If agentic coding sticks around — and that is an *if* — the interesting direction is harnesses you can open up and modify.

- See what the model actually sees
- See where your tokens go
- Keep the primitives you need, drop the ones you don't

</v-clicks>

<v-click>

Claude Code is closed. OpenCode is more open. [Pi](https://pi.dev) goes further: minimal by design, you assemble the rest.

</v-click>

<v-click>

Not a recommendation. A direction worth watching.

</v-click>

---
layout: intro-image
image: 'images/final.png'
---

<!-- TODO: Replace images/final.png with a closing/outro image -->

# Takeaway

<v-clicks>

- A model is text in, text out. A harness is what makes it act.
- Model, harness, supplier — three layers, mix and match.
- Context is what you bring. Feedback loops are what your project provides.
- The tools will keep changing. The fundamentals will not.

</v-clicks>

<v-click>

Pick a tool. Use it on a real project. Learn by steering it.

</v-click>

<br />

[blog.theodorc.no](https://blog.theodorc.no) · [@theodorc.no on Bluesky](https://bsky.app/profile/theodorc.no)

<PoweredBySlidev mt-6 />
