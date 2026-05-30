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

<div class="absolute top-10 left-10 z-10">
  <span class="font-700 text-white">NDC 2026 CPH</span>
</div>

<div class="absolute bottom-10 right-10 z-10 text-white">

📙 [blog.theodorc.no](https://blog.theodorc.no)
🦋 [@theodorc.no](https://bsky.app/profile/theodorc.no)

</div>

<div class="absolute bottom-10 left-10 z-10 border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white p-4 rounded-lg">
  <p class="font-700 text-xl">Theodor René Carlsen</p>
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
layout: image-right
image: 'images/agentic-images/agents_around_computer_16_9.png'
---

# It's actually three things

When people say "AI coding tools", they usually mean three separate things welded together.

<v-clicks>

- **Models** (the brain): GPT, Claude, Gemini
- **Harnesses** (what lets the model act): Claude Code, Cursor, OpenCode, Codex, Antigravity, Aider, Cline, Continue, Zed, Goose, Pi, and on, and on...

</v-clicks>

<v-click>

(Plus the **supplier**: where you get the model. OpenAI, GitHub Models, OpenRouter, or Ollama on your own machine. Same model, many places, different price and privacy.)

</v-click>

<v-click>

Same model, different harness. Same harness, different model. There is no single correct combination.

</v-click>

<v-click>

Agent = model + harness

</v-click>

---
layout: intro-image-right
image: 'images/agentic-images/a_small_being_2_3_format.png'
---

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

Understanding this removes a lot of the magic, and a lot of the fear.

</v-click>

---
layout: intro-image-right
image: 'images/agentic-images/ai_creature_vibe_16_9.png'
---

# The harness: what makes it act

The model itself is just text in, text out. The harness wraps it with tools.

<v-clicks>

- Read and write files
- Run shell commands
- Search the codebase
- Call external APIs
- Loop: act, observe, repeat

</v-clicks>

<v-click>

A model with a harness around it is what takes real actions on your behalf.

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
[
  {
    "id": "call_KfVpVI8G92RkdOcmnokuD2sp",
    "type": "function",
    "function": {
      "name": "read_file",
      "arguments": "{\"path\":\"package.json\"}"
    }
  }
]
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
layout: intro-image-right
image: 'images/agentic-images/guy_on_computer_16_9.png'
---

# Context engineering

The skill that actually matters.

<v-clicks>

- The agent only knows what you give it
- Missing context leads to wrong output, same as with a new colleague
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

They are markdown files the harness reads before it acts. Project context, commands, conventions, the things you would otherwise repeat in every prompt.

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

# So why isn't Claude Code the future?

<v-clicks>

It is a closed bundle: one harness, tied to one model family, that you cannot open up.

If agentic coding sticks around (and that is an *if*), the interesting direction is the opposite: harnesses you can open and modify.

- See what the model actually sees
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
