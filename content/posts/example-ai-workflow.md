+++
title = "Creating ad hoc tools with your agent - BYOA"
date = "2026-03-12T15:10:33+01:00"
author = "Theodor René Carlsen (Theo)"
authorTwitter = "theodorc_" #do not include @
cover = ""
tags = ["ai", "opencode", "ad hoc tools"]
keywords = ["", ""]
description = "Creating ad hoc tools with AI - BYOA"
showFullContent = false
readingTime = false
draft = false
+++

(Huffameg, lets see if I can write a full blog post without AI, just for the love of
the game)

## Preamble

These last few months I've been diving deeper into AI tools, and more specific
agentic tools. Mainly for work, but also as preparation for my NDC lightning
talk ["The fundamentals of agentic
coding"](https://ndccopenhagen.com/agenda/lightning-talks-1-0raw/0he5mnt1kdo)
this summer. The talk submittal was mostly an excuse to learn all these tools
better. I've tried VSCode, codex(cli), copilot(cli), gemini(cli) and opencode. I
hope to increase this list by the summer, especially interested in more GUI
tools that makes it easier to switch between concurrent agent sessions.

So when I created a really useful ad hoc tool for myself using these tools, I
knew I wanted to share it.

Enough fluff, I can talk about my specific setup in a different post.

## Context

Recently, especially after becoming lead developer, I've had to resort to all
types of diagrams to convey my thoughts. In the beginning I just used
Excalidraw, but when making more structured diagrams, like sequence diagrams, I
wanted something better so I resorted to
[sequencediagram.org](https://sequencediagram.org). It has its own proprietary
syntax for creating diagrams, but it was text based and as a programmer I
preferred that. But it was still quite tedious to create them.

![Excalidraw example](/img/ai-blog-3.png)

Hmm, isn't there some new and fancy entity that's incredibly good a producing lots of text?

I first thought of my colleague Cristian, but I came to the conclusion that
modern LLMs is a better choice. I had a specific system I wanted to model that
was already specced up in a markdown file (also done by AI), so I just included
that file in my agents window (I use `opencode`), and let it generate a diagram
with correct syntax. 

And voila! I copy and paste the output into the website and it looks very good!

And so I iterated, asked my agent to make changes, copied and pasted and so
forth. All this copy and pasting felt like "code smell", or maybe like an "AI
smell"?(I'm coining that now). There has to be a better way!

## The way

First of all, lets use a open text format, lets use
[Mermaid.js](https://mermaid.js.org/). Its supported many places (Most
importantly Github), and supports many different types of diagrams. One of them
being sequence diagrams. I had a look at their online editor, and was of course
met by a popup: "Do you want the free version, or Mermaid Plus™ with AI for X$
every month". (They have even changed domain from `mermaid.js.org` to
`mermaid.ai`(!))

I'm not hating on them trying to create a business of this syntax and renderer,
but I already have tons of credits from my jobs Github enterprise account, I
want to use those credits! (Or my private subscriptions on personal projects).

So I tasked my `opencode` instance to create a locally running service for me
instead. Let me see if I can find my original prompt.. (full transcript in the
bottom of this post):


## Prompt

```
Build a minimal TypeScript Node.js app for live previewing Mermaid files.

Use:
- Node.js
- Express
- chokidar for file watching
- Server-Sent Events for live updates
- a static HTML/CSS/JS frontend
- Mermaid in the browser

Requirements:
- Watch `./diagrams/current.mmd`
- Serve a page on localhost that renders that Mermaid file
- Auto-update the diagram when the file changes
- Show render errors nicely
- Show the raw Mermaid source below the diagram
- Keep the code very small and readable
- Add a README and sample file
- Add scripts for `npm install` and `npm run dev`

Please create the full implementation. 
```

## ....

Okay, I did spar back and forth with ChatGPT for a little bit first, but not
much. Then I let it create the prompt for me.

And it worked!

Just how I wanted it. Now I open `opencode` in the new project folder, refer to
specific files or even let it read code and it creates diagrams while I have a
live preview in my browser.

```bash 
> opencode
oc> create a sequence diagram from this spec @../myproject/docs/spec.md
```

For me this was a great example of ad-hoc tools you can just make with very
little effort and also lets you keep using your existing AI-subscription(Bring
Your Own Agent - BYOA).

Below you can see it created a diagram from my terrible attempt at creating my
own [blog engine](https://github.com/theodorrene/goblog) in golang (I might
revisit that at one point with these modern AI tools. I would love some ad hoc
specialized sections in my blogposts)

![Diagram from goblog](/img/ai-blog-1.png)

## Iterating on the solution

I've used it for a bit(2 days,wow) now, and I did a live demo for a team. While
showing its abilities, I noticed I was missing an export to PNG button. So I
just prompted that into existence during the session(!). 

```bash
>opencode
oc> add a export to png tool
```
(Proper grammar is not something I prioritize when talking to LLMs hehe)

I later noticed that I wanted to use this tools from any directory, so I was
thinking that this might be a great use case for MCP. So I told it to make it
into an MCP server. Now I can open my agent tool from any project, the service
is added as a tool in the context, and at any point I can just say "make a
diagram from this implementation we are discussing". And with Mermaid you are
not limited to sequence diagrams, there are many different types.

While using it I kept iterating:

- Validation of syntax
- More than one diagram at a time
- Right click to save to png
- Save image to clipboard

Just a prompt away.

Below I prompted my agent to create the diagram as a sequence diagram instead.

![Iterating on the diagram](/img/ai-blog-2.png)

## Finally

Again, I thought this was an interesting real-life example on how to use these
tools to solve the problems you have day to day in your work. I'll definitively
have this in the back of my mind next time I'm met with tedious work. Honestly
my head is aching from all the possibilities. And I know for a fact that in half
a year this post will seem ancient compared to the solutions that arise.

Many want to know "How do effective programmers use AI these days?", and I think
its almost impossible to create a tutorial on it. It changes so fast, and
everyone has their own setup that they are comfortable with. I don't think many
would like my setup. Maybe I'll share mine some time. Please reach out if you
want to talk agentic tools! I have, unfortunately, come to the conclusion that
the only way forward is to embrace the tools and models, no matter how much I
love the art of writing code.

(I thought of open sourcing the application and MCP server, but a part of me is
like, just build it yourself? I've shared my prompt; Isn't that the future that
we've been prophesied?)

(I did manage to write this post without AI. At what point do you think
people will stop caring about that? Hopefully never)


### Full session from within `opencode` (with small redactions for IP reasons)

# Mermaid previewer

**Session ID:** ses_3284fe682ffeZlGACbP4gOh8pj
**Created:** 3/10/2026, 1:19:28 PM
**Updated:** 3/10/2026, 2:42:43 PM

---

## User

Build a minimal TypeScript Node.js app for live previewing Mermaid files.

Use:
- Node.js
- Express
- chokidar for file watching
- Server-Sent Events for live updates
- a static HTML/CSS/JS frontend
- Mermaid in the browser

Requirements:
- Watch `./diagrams/current.mmd`
- Serve a page on localhost that renders that Mermaid file
- Auto-update the diagram when the file changes
- Show render errors nicely
- Show the raw Mermaid source below the diagram
- Keep the code very small and readable
- Add a README and sample file
- Add scripts for `npm install` and `npm run dev`

Please create the full implementation. 

---

## Assistant

**Tool: todowrite**

---

## Assistant

**Tool: todowrite**

---

## Assistant

**Tool: write**

---

## Assistant

**Tool: todowrite**

---

## Assistant

**Tool: bash**

---

## Assistant

**Tool: write**

---

## Assistant

**Tool: todowrite**

---

## Assistant

**Tool: write**

---

## Assistant

**Tool: todowrite**

---

## Assistant

**Tool: write**

---

## Assistant

**Tool: write**

---

## Assistant

**Tool: todowrite**

---

## Assistant

**Tool: write**

---

## Assistant

Now install dependencies and verify the server starts:

**Tool: bash**

---

## Assistant

**Tool: bash**

---

## Assistant

Server starts and responds. All done.

**Tool: todowrite**

---

## Assistant

Here's what was built:

**Files created:**

| File | Purpose |
|---|---|
| `src/index.ts` | Express server — serves static files, SSE endpoint `/events`, chokidar watcher |
| `public/index.html` | Single-page frontend — Mermaid rendering, SSE client, error display, source view |
| `diagrams/current.mmd` | Sample flowchart to edit |
| `package.json` | Dependencies + `dev`/`build`/`start` scripts |
| `tsconfig.json` | TypeScript config |
| `README.md` | Usage instructions |

**How it works:**

1. The browser connects to `/events` (SSE) on page load
2. The server immediately pushes the current file contents
3. chokidar watches `diagrams/current.mmd` for `add`/`change`/`unlink` events
4. Any change broadcasts the new source to all connected clients
5. The browser calls `mermaid.render()` — on failure, the error message is shown in a red box below the diagram
6. The raw Mermaid source is always visible in a collapsible `<details>` section

**To run:**
```bash
npm install
npm run dev
# → http://localhost:3000
```

---

## User

sweet, read @../dr/nyhedsapp/docs/<redacted> (or something like that and write a sekvens diagam on how the minting works)

---

## Assistant

**Tool: bash**

---

## Assistant

**Tool: bash**

---

## Assistant

**Tool: bash**

---

## Assistant

**Tool: read**

---

## Assistant

**Tool: write**

---

## Assistant

Done. The diagram is now live in `diagrams/current.mmd` — if the dev server is running you'll see it at `http://localhost:3000`.

The sequence covers the full minting flow from the doc:

1. **User opens <redacted>** → app fetches an OAuth access token
2. **App generates a correlation ID** (UUID) for tracing the session
3. **App calls backend** <redacted>
4. **App opens WebView** <redacted>
5. **Vendor sets cookie and redirects** to the destination URL
6. All three error paths are shown: backend 401/403 (re-auth), vendor 401/403 (refresh + retry), network failure (fallback UI)

---

## User

okay now just write a hello world diagram

---

## Assistant

**Tool: write**

---

## Assistant

Done.

---

(here is output from my demo)
## User

new node pointing to DR

---

## Assistant

**Tool: edit**

---

## Assistant

Wait — "new node pointing to DR" means a new node that points *to* a DR node. Let me re-read: you want a new node pointing to DR, so DR is the target.

**Tool: edit**

---

## Assistant

Added a new node `DR` with `World` pointing to it.

---

## User

sweet, read @../dr/nyhedsapp/docs/<redacted> (or something like that and write a sekvens diagam on how the minting works)

---

## Assistant

Already read that file earlier — writing the diagram now.

**Tool: write**

---

## Assistant

Done — same diagram as before, live in the preview.

---

## User

instead of outh provideer, write login.dr.dk

---

## Assistant

**Tool: edit**

---

## Assistant

Done.

---

## User

add a export to png tool

---

## Assistant

**Tool: todowrite**

---

## Assistant

**Tool: read**

---

## Assistant

**Tool: edit**

---

## Assistant

**Tool: edit**

---

## Assistant

**Tool: edit**

---

## Assistant

Now enable/disable the button based on whether a diagram is rendered:

**Tool: edit**

---

## Assistant

Also disable the button when the source is empty:

**Tool: edit**

---

## Assistant

**Tool: todowrite**

---

## Assistant

Done. An **Export PNG** button now appears in the header next to the status pill. How it works:

- Disabled until a diagram renders successfully (re-disabled on error or empty file)
- On click: clones the rendered SVG, draws it onto a `canvas` at 2× device pixel ratio for sharpness, fills the dark background (`#1e293b`), then triggers a download of `diagram.png`
- No server round-trip — entirely client-side

---


