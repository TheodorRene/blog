---
theme: apple-basic
title: The Fundamentals of Agentic Coding
drawings:
  persist: false
mdc: true
favicon: 'images/favicon-32x32.png'
fonts:
  sans: 'Zilla Slab'
  serif: 'Zilla Slab'
  weights: '400,600,700'
transition: slide-left
layout: center
class: cover-video
---

<video autoplay loop muted playsinline class="absolute inset-0 w-full h-full object-cover">
  <source src="/images/agentic_front_loop.mp4" type="video/mp4" />
</video>

<div class="absolute bottom-10 right-10 z-10 border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg">

📙 [blog.theodorc.no](https://blog.theodorc.no)
🦋 [@theodorc.no](https://bsky.app/profile/theodorc.no)

</div>

<div class="absolute bottom-10 left-10 z-10 border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg">
  <p class="font-700 text-xl leading-tight">Theodor René Carlsen</p>
  <p class="text-sm leading-tight">Fullstack developer at Impero 🐘</p>
  <p class="text-sm opacity-80 leading-tight">NDC CPH 2026</p>
</div>

<style>
.cover-video {
  padding: 0 !important;
}
.cover-video a {
  color: #fff;
}
</style>

---
layout: statement
---

# You're not behind.

---
layout: intro-image-right
image: 'images/agentic-images/a_small_being_2_3_format.png'
---

# AI coding tools are three things:

<v-clicks>

- **Models** — the brain. GPT, Claude, Gemini.
- **Suppliers (Inference providers)** —  OpenAI, Anthropic, OpenRouter, GitHub, Ollama(local)
- **Harnesses** — what lets the model act (Claude Code, Codex, Agents in
  VSCode..)

</v-clicks>

<v-click>
Mix and match
</v-click>

---
layout: intro-image-right
image: 'images/agentic-images/agents_around_computer_16_9.png'
---

# Agent = model + harness

Every turn, the harness hands it two things:

<div v-click>

- A **system prompt** — text. Who it is, what it knows, your conventions.
  Configurable, but some times only appendable

</div>

<div v-click>

> You are Claude Code, Anthropic's CLI for Claude. You help with software engineering tasks…

</div>

<div v-click>

- A set of **tools** — functions it may call: read files, run commands, fetch
  from the web

</div>

---
layout: two-cols
layoutClass: gap-8
---

# A tool call, up close

You describe a tool, and let the model know about it

```ts {all|3-17|19-23|25-26}
const openai = new OpenAI()

const tools = [{
  type: "function",
  function: {
    name: "read_file",
    description: "Read the contents of a file",
    parameters: {
      type: "object",
      properties: {
        path: { type: "string" },
      },
      required: ["path"],
    },
  },
}]

const res = await openai.chat.completions.create({
  model: "gpt-5.5",
  messages: [{ role: "user", content: "What's in package.json?" }],
  tools,
})

// the model doesn't read the file...
console.log(res.choices[0].message.tool_calls)
```

::right::

<div v-click>

It just answers with which tool to call:

```json
{
  "name": "read_file",
  "arguments": "{ \"path\": \"package.json\" }"
}
```

</div>

<div v-click>

The harness reads that JSON and does the real work:

```ts
const { path } = JSON.parse(call.arguments)
const text = await readFile(path) // the actual read
// hand `text` back to the model
```

</div>

---
layout: intro-image-right
image: 'images/agentic-images/ai_creature_vibe_16_9.png'
---

# The feedback loop changes

<v-click>

- You can use it like ChatGPT

</v-click>

<v-click>

- But then *you* control the loop. Give some of that up.

</v-click>

<v-click>

- Hand it a goal. It explores, runs your tests, iterates.

</v-click>

---
layout: center
class: text-center
---

# Now we know the parts.

---
layout: statement
---

# Work in text

---
layout: intro-image-right
image: 'images/agentic-images/guy_on_computer_16_9.png'
---

# Context

Like briefing a new colleague.

<v-clicks>

- They know the trade, not your project.
- It can explore the codebase, gathers some itself.
- Steer it. Notice what it keeps getting wrong.

</v-clicks>

<v-click>

So write that down.

</v-click>

---
layout: two-cols
layoutClass: gap-8
---

# AGENTS.md, Skills, MCP

<div v-click="1" class="my-8 text-xl">

- **AGENTS.md** — project notes, injected into the prompt

</div>

<div v-click="3" class="my-8 text-xl">

- **Skills** — Markdown too. Stay lean.

</div>

<div v-click="4" class="my-8 text-xl">

- **MCP** — more tools. Usually the CLI is enough.

</div>

::right::

<div v-click="2">

```md
# AGENTS.md

## Commands
- `npm run test:int` needs Postgres up first
- `npm run db:gen` after any schema change

## Glossary
- "CR" = Control Report, not change request
- "Framework" = a compliance standard, not the web kind
```

</div>

---
layout: intro-image-right
image: 'images/agentic-images/a_few_small_2_3.png'
---

# Claude Code is not the future

<v-click>

- The model is a black box. The harness doesn't have to be.
- Not one thing, but three: supplier, model, harness.
- The tool calls run on your machine.
- Open source

</v-click>

---
layout: intro-image-right
image: 'images/agentic-images/sunset_2_3_format.png'
---

# Still not behind.

<v-clicks>

- You know the fundamentals now. It's just text underneath.
- Keep it simple: a model and terminal commands go a long way.

</v-clicks>

<v-click>

Pick one. Use it on something real.

</v-click>

<div class="mt-12 text-sm opacity-80">

[blog.theodorc.no](https://blog.theodorc.no) · [@theodorc.no on Bluesky](https://bsky.app/profile/theodorc.no)

</div>

<div class="mt-6 flex justify-center">
  <img src="/images/impero_logo.jpg" class="h-24 rounded-md" />
</div>
