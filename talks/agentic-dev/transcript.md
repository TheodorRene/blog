# Transcript — The Fundamentals of Agentic Coding (AKA Vibe Coding)

**Theodor René Carlsen — NDC Copenhagen 2026** · lightning talk, 15:41
Video: https://www.youtube.com/watch?v=HUDIxO-F63E
Slides: `slides.md` in this directory

Source material, not a published page. Nothing in this directory ships — `scripts/build-talks.sh`
only compiles `slides.md`. Kept here as the raw input for a write-up
(see `src/content/posts/claude-code-is-not-the-future.md`, which covers the same
models / suppliers / harnesses distinction).

Cleaned from YouTube's auto-generated captions: speech-recognition errors corrected, filler
removed, punctuation and paragraphing added, headings inserted at section boundaries. Wording
is otherwise faithful to the talk. Two unrecoverable spots are flagged in "Editor's notes"
at the end.

---

## You're not behind

**[0:14]** Agentic coding. Agents. MCPs. Claude Code. Codex. Claude Skills. AGENTS.md. CLAUDE.md. There are so many words in this ecosystem by now. There's a lot, and you're sort of expected to know what all of these words mean — like "harnesses" and "context engineering." That didn't even mean anything a couple of years ago.

What I felt personally, and also with my colleagues, is that it's daunting getting started. It feels so complex even beginning — but you feel you really *have* to get started, or you're not going to make it. You have this fear of missing out, that you'll be left behind.

**[0:50]** But the intention of my talk is: you're not behind. LinkedIn will tell you that you're behind. Your new boss with the Claude Code Max subscription will tell you that you're behind. And it will change — like it has changed. They have been pushing the same agenda for years, that you have to stay on top and run 10,000 sub-agents.

**[1:22]** But you really don't have to be on top of it that much, because the ecosystem still moves. As I said, it's changed from a year ago, and a year from now it will be different again. But I do still feel there are some fundamentals worth learning and remembering when you're getting into this, so that it's not as complex as it might seem.

## The three parts

**[1:56]** So let's build a baseline. AI coding tools are three things — three important things.

**Models.** Those are the most important of the three. Those are like 95% of everything. You can put all you want around it, but if the model doesn't work the way you want it to, you won't get very far. That's the brain. So you have the GPTs from OpenAI, the Claudes from Anthropic, the Geminis, and some Chinese ones as well.

**Suppliers.** People forget about those as well — the so-called inference providers, as people will say instead. OpenAI and Anthropic usually host their own models, but there are other competitors that host a whole wide variety of models. And you can also run it locally, which can be important in the future.

**[2:29]** **Harnesses.** If there's one word that I want you to learn from this talk and take away from it, it's *harnesses* — because they let the models actually do something. Models are just text in, text out. But how do they *act*? So a harness is something like Claude Code, which I'll be using generally because I think most people are familiar with that. Codex. Agents in VS Code. OpenCode. Et cetera.

**[3:02]** And you can mix and match these — at least in theory. You could have GPT-5.5, because that's your favourite model that works really well for you. Your place of work has a GitHub Enterprise contract, so you choose that — or you *have* to choose that. And you prefer that your client, and the tools being run on your computer, are open source, so you can hack it and introspect what's actually happening. So you use something open source, like OpenCode.

## What an agent actually is

**[3:35]** And an agent: when people talk about agents, it's mostly the model and the harness. And it has two important things.

There's a **system prompt** — that's the initial text being sent to the model, about like, "Hey, you're Claude Code, you're from Anthropic, and you're the best developer in the world." If that helps anything, I'm not sure, really.

**[4:08]** And it's configurable. Maybe you want to write something else — you can usually just append to it. With Claude Code you can't change it; they're trying to not let you even read it.

You also have **tools**. When I started trying out these AI-assisted coding tools, I didn't understand what tools were. Things get really fluffy when people talk about AI, and they also make up new words — like Anthropic's "workflows." What the hell even is that?

**[4:40]** So: the set of tools it gives the agent. That it can read files, it can run terminal commands, it can fetch from the web.

Let's look at something concrete. And by concrete, I've chosen just the OpenAI JavaScript SDK, and we're declaring a tool. We're declaring a function that can read files. It has a description, it tells you the kind of parameters —

**[5:13]** — but if you look at it, there's nowhere it says what the actual *implementation* is. And you will see this is a recurring theme in this talk, and in other things we'll look at: it's just text.

So you send this off to your model — let me see if I can scroll; oh no, don't go back — "What's in package.json?" And you register the tools at the bottom. So you send that with your call: "Hey, these are the tools that you have."

**[5:46]** And then the model will read that file... or will it? It will just sort of return an *intention*. So the models, as part of their training, have learned to be really, really good at making tool calls. But they don't have any ability to actually *do* the calls. They are just text machines. So they give an intention, and then your harness — your Claude Code — will do something with it. Most likely it will read the file. Or it will nuke the moon; you have no idea. But hopefully it will read the file.

## The loop

**[6:21]** So it reads the file, and then the output of that gets fed back into the model. And that's important, because the feedback loop changes. The loop of how you're working with AI changes.

Many might boot up Claude Code, or their agents in VS Code, and just use it like ChatGPT. You'll ask some questions, you'll copy-paste some code. But that's not the full power of it, because you are then a very big part of the loop — you are giving the input and the agent is responding.

**[6:54]** And sort of unfortunately, the way we've been going with AI tools, we're giving up some agency. We're giving up some control over to the agents. And that's because they are incredibly smart — like, annoyingly, really really smart. I was really sceptical in the beginning, but now I see you can't really ignore it.

So you can give it tasks — quite vague tasks, actually. You can give it a goal. It can explore your codebase, read some files, read the output of those files, and act upon that.

**[7:28]** It can run your tests. Just ask for that, and it runs the tests, it gets the output, and it can work on that. So then it's looping by itself. And you can, I guess, sort of control how much you are part of this loop. Some people bring it really far out and have some automatic stuff — or you can be much more part of it, and steer it.

## Fundamental tips

**[8:00]** So now we know the parts. I could have basically stopped the talk now, because if you understood that, then I feel most things with these AI coding tools will be quite easy — because most of it is just built on top of that.

But there are some fundamental tips I can give about how to think about it. And I'm repeating myself, but: **work in text.** Models are trained on text, they output text. So if there's any problem that you have, and you can convert it to text in any way, then it will be really good.

**[8:34]** I had this issue where I was learning a codebase, trying to make sense of it, and I really wanted some diagrams. I really wanted to see the dependency graph as a diagram. And I could go through the code, open Excalidraw or Figma or some tool like that and drag and drop — but that felt like an AI smell to me. Like, this doesn't make sense; I want the *agent* to do this for me.

**[9:06]** So then I thought: well, there are lots of markup languages that can create diagrams. And so I use that, and now I can just generate diagrams on the fly when I'm in my codebase.

Another thing is **documentation.** Documentation is already text, but sometimes it's packed around with a lot of — it's very deep inside Confluence, or it's in a Word file in your SharePoint, and your agent won't reach that without jumping through so many hurdles. So you can keep that documentation in your codebase, and then your agent can really easily access it.

**[9:39]** And you will see that suddenly everything is Markdown. And that's just because it's readable by humans and it's super readable by the agents. That's also a common thing: if it's readable and understandable by a human, then it's most likely readable and understandable by a model.

## Context and steering

**[9:39]** So there's **context.** People would say context engineering is the new thing. But context is also very simple: it's just what sort of text you push into your model.

**[10:13]** And you can treat the agent like briefing a new colleague. They know the trade — they know how to work the computer and write code and that sort of stuff — but they don't know the domain that you're working in. They might not know project-specific things. So you can give it some hints. You can ask it to explore the codebase, or maybe there are some files it should start at, and then it will gather some itself.

**[10:45]** And I mentioned **steering** earlier. You will hear other people talking about AI, like they're "steering their agent" — whatever that means. But when you're seeing that: again, we have given up our agency. It's running off on its own, and you see that it always runs off in the wrong direction. We have to steer it somehow. And we can do that with more context — text-related stuff — and you can write it down.

## AGENTS.md and skills

**[11:20]** An example of that is maybe AGENTS.md, that you've possibly heard of, or skills.

AGENTS.md is usually a project-specific file that contains something the model would never have known — very specific to your codebase. Like: you have to run this command first, or you have to boot up Postgres before you run your tests. Maybe some glossary, because you have some domain language that's not very common.

**[11:53]** You *shouldn't* put in stuff like "this is how TypeScript works" or "this is how Postgres works" — because you have to remember that your new colleague is really, really, really smart. They're just new, sometimes.

And people will talk a lot about **skills.** You'll see that especially on LinkedIn: "Oh, I just released my thousand skills that will supercharge your agents to the moon." And I was like, wow, that sounds really interesting — how does that work? And they say, "Oh, you just run this command and it installs it in your Claude Code." Oh, what are these skills, so interesting!

**[12:26]** And they're also just Markdown. And I was very, very disappointed to learn that it was just Markdown again. And that happens all the time.

And with it comes some maintenance cost as well, because both the AGENTS.md will be injected into your prompt, and the skills — it can read some text files when it needs to. And that can be relevant for some cases. Maybe you have a very new library that the models aren't caught up to yet, or some very specific thing within your domain — maybe the Danish tax laws or something like that.

**[12:59]** But I would recommend, getting into this: **stay lean.** And when you see that you're steering too much, then you can add some skills.

## MCP as a footnote

**[12:59]** Some people might think: why is MCP just a footnote in this talk? Because that was one of the big things people were talking about when AI came. And — we've already talked about that before. They're just tools.

**[13:33]** So the harness has some tools that are built in. And if you want some other tools — because some harnesses won't let you change what tools you use, not naming names — and you want to add some tools, then that can make sense. But the models are also incredibly well-versed in using just a command line. So: do you need a GitHub MCP to open a pull request? Maybe not. Maybe you'll just use the GitHub CLI, because it knows that very, very well.

## A digression on closed harnesses

**[14:06]** And now I have a small digression. I've tried hiding my hate for Claude Code. *[laughter]* It's not hate — it *is* what I use. That's because that's what I have available at my work.

But I hope that Claude Code is not the future. And with that, I'm talking about it being one singular thing: that the supplier, the harness, and the model are all one company, and you can't make any changes to, let's say, the harness. The harness is very locked down, and I don't like that for our ecosystem.

**[14:38]** The models — sure, for me they can be a black box. That's fine, that's too complex for me. But the harness is something that doesn't have to be a black box. We can still control that part. Again, these are things that are running on *your* machine, and losing that control is something that I'm not happy with. And also, keeping things open source will help the ecosystem.

## Wrapping up

**[15:12]** You now know the fundamentals. Or maybe you knew it from before, but you sort of hadn't thought about it in that way. It's just text.

And when you're starting, or when you're continuing: keep it simple. Don't try to install every MCP and every skill that you see on the net. Just see what works for you. And most importantly, just pick one and get started, and get a feel for it yourself.

Thank you.

*[applause]*

---

## Editor's notes

Corrections applied throughout: "cloud code" / "closed code" / "called code" → Claude Code · "cloud MD" → CLAUDE.md · "agents MD" → AGENTS.md · "the claws from Anthropic" → the Claudes from Anthropic · "codeex" → Codex · "Excaliraw" → Excalidraw · "conflence" → Confluence · "shareepoint" → SharePoint · "Postgress" → Postgres · "glossery" → glossary · "package JSON" → package.json · "marked down" → Markdown · "skeptic" → sceptical.

Two spots where the captions were too garbled to recover with confidence — worth checking against the video before publishing:

1. **[0:14]** The opening jargon list was transcribed as "agents MCPS cloud code cloud code uh cloud mythos uh agents MD uh cloud MD." Rendered here as "Agents. MCPs. Claude Code. Codex. Claude Skills. AGENTS.md. CLAUDE.md." — "cloud mythos" is a guess.
2. **[4:08]** "they also make up new words like anthropic reason workflows" — rendered as "Anthropic's 'workflows'". Possibly "Anthropic recently released 'workflows'".
