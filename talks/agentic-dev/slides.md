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

# It's three things

"AI coding tools" are really three things, welded together.

<v-clicks>

- **Models** — the brain. GPT, Claude, Gemini.
- **Suppliers** — where you get them. OpenAI, OpenRouter, GitHub, Ollama on your laptop.
- **Harnesses** — what lets the model act.

</v-clicks>

<v-click>

Mix and match. No single right combination.

</v-click>

---
layout: intro-image-right
image: 'images/agentic-images/agents_around_computer_16_9.png'
---

# Agent = model + harness

A model is just text in, text out. Every turn, the harness hands it two things:

<div v-click>

- A **system prompt** — text. Who it is, what it knows, your conventions.

</div>

<div v-click>

> You are Claude Code, Anthropic's CLI for Claude. You help with software engineering tasks…

</div>

<div v-click>

- A set of **tools** — functions it may call: read files, run commands, search, call APIs.

</div>

<v-click>

Then it runs whatever the model asks for, feeds the result back, and loops.

</v-click>

---
layout: two-cols
layoutClass: gap-8
---

# A tool call, up close

You describe a tool. The model is trained to ask for it, as JSON.

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
  model: "gpt-4o",
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

<v-click>

The model never touched the disk. It produced text. The harness does the rest.

</v-click>

---
layout: center
class: text-center
---

# Now we know the parts.

How do we use them?

---
layout: two-cols
layoutClass: gap-12
---

# Feedback loops

How the tools work: explore, act, observe, repeat.

<v-clicks>

- It explores: reads files, searches the codebase, runs commands
- It runs your tests and linters, then reads the output
- It corrects itself and loops, without waiting for you

</v-clicks>

<v-click>

Without this, an agent is glorified autocomplete.

</v-click>

::right::

<div class="flex flex-col items-center justify-center h-full">
  <img src="/images/agentic-images/core_agent_loop.avif" class="rounded-lg bg-white p-3 max-h-96 object-contain" />
  <span class="text-xs opacity-60 mt-3">source: langchain.com</span>
</div>

---
layout: intro-image-right
image: 'images/agentic-images/guy_on_computer_16_9.png'
---

# Context engineering

What goes in that system prompt is your call.

<v-clicks>

- The agent only knows what you give it
- Missing context leads to wrong output, same as with a new colleague
- Good context is concrete: paths, examples, constraints, what *not* to do

</v-clicks>

<v-click>

The one skill that carries over. You learn it by using a tool on real work, not by reading about it.

</v-click>

---
layout: default
---

# AGENTS.md, Skills, MCP

<v-clicks>

AGENTS.md, CLAUDE.md, Skills: markdown files the harness reads and drops into the system prompt. The context you would otherwise repeat in every prompt.

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

Nothing magical. It all becomes one block of text the model reads. And MCP? Same story for the other half: a standard way to plug in more tools.

</v-click>

---
layout: default
---

# So why isn't Claude Code the future?

<v-clicks>

It is a closed bundle: one harness, tied to one model family, that you cannot open up.

If agentic coding sticks around (and that is an *if*), the interesting direction is the opposite: harnesses you can open and modify.

- See exactly what the model sees
- See where your tokens go
- Keep the primitives you need, drop the ones you don't

</v-clicks>

<v-click>

Claude Code is closed. OpenCode is more open. [Pi](https://pi.dev) goes further: minimal by design, you assemble the rest.

</v-click>

<v-click>

The future is picking your own model, supplier, and harness. Not betting on one bundle.

</v-click>

---
layout: intro-image
image: 'images/agentic-images/sunset_2_3_format.png'
---

# Takeaway

<v-clicks>

- A model is text in, text out. A harness is what makes it act.
- Model, harness, supplier. Three layers, mix and match.
- Context is what you bring. Feedback loops are what your project provides.
- The tools will keep changing. The fundamentals will not.

</v-clicks>

<v-click>

Pick a tool. Use it on a real project. Learn by steering it.

</v-click>

<br />

[blog.theodorc.no](https://blog.theodorc.no) · [@theodorc.no on Bluesky](https://bsky.app/profile/theodorc.no)

<PoweredBySlidev mt-6 />
