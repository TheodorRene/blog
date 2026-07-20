---
title: "Trusting a plausible debugging story for too long"
date: "2026-06-19T10:30:00+02:00"
description: "I lost time to a bug because I believed a good explanation before I had proved where the failure was."
tags: ["ai", "debugging", "rust"]
draft: true
---

I lost a fair bit of time on a bug recently. Not because the fix was hard, it
was one line in the end, but because I trusted a plausible explanation before I
had proved where the failure actually was.

The task looked simple on paper. Return a discriminated `409 Conflict` body so
the frontend could show different messages depending on why an entity could not
be removed. One reason was that it was used in an assignment. The other was that
it was referenced in a datasheet.

I had already been at the task for a while, so by the end I leaned on the agent
to do the remaining wiring: thread a body through the `409` returned when
removing an entity from a control program.

The backend change looked right. The error enum had a payload type, the conflict
variant carried the reason, and the axum handlers returned
`ImperoErrorWeb<ControlEntityRemovalConflict>`.

But the browser still got a `409` with no body.

## What I did wrong

I let the first convincing theory become the working truth.

When the body was still missing, I had Opus work on it for a long time. High
reasoning, multiple sessions, two contexts filled up. I let it go deep because
the theory it found sounded reasonable: the response body was being dropped in
the Rocket/axum proxy layer.

That was believable. The codebase has both Rocket and axum. There is a proxy
bridge. The response streaming there does look a bit suspicious. In a codebase I
don't know well, that kind of explanation is easy to accept, because I don't yet
know how the global response handling behaves.

I also let the context build up for too long. By the second day I tried a
compaction, but the investigation was still carrying a lot of accumulated
assumptions. I suspect GPT-5.5 found the issue partly because it came in with a
cleaner context and wasn't already anchored on the proxy theory.

The mistake was not using AI. The mistake was accepting a root cause before
forcing a layer-by-layer proof.

What I should have asked, in order:

- Is the domain error producing a payload?
- Is the axum response producing a body?
- Is Rocket receiving the body?
- Is any global response middleware modifying it?
- Is the client receiving what Rocket sent?

Instead I spent too much time poking at the most suspicious looking local code.

## What the bug actually was

The actual issue was Rocket's global error-handler fairing in
`impero_web/src/cli/web.rs`.

It strips JSON and plain error bodies unless the status code is explicitly
listed in `EXPLICIT_ERROR_CODES`. `409` was not in that list.

So the axum path was doing the right thing. It returned an `ImperoErrorWeb<T>`,
serialized the payload with `axum::Json`, and set
`Content-Type: application/json`. Then Rocket saw a JSON `409`, checked
`EXPLICIT_ERROR_CODES`, did not find `409`, and stripped the body.

The fix was tiny:

```rust
const EXPLICIT_ERROR_CODES: &[u16] = &[400, 401, 408, 409, STATUS_CODE_ERROR_OPERATION_FAILED];
```

## Why the existing delete endpoint worked

This was the misleading part.

`DELETE /api/entities/<id>` already returned a `409` body, and that worked.

But that endpoint goes through the legacy Rocket `ImperoError` responder. It
writes a sized body, but it does not set `Content-Type: application/json`. The
stripping logic only targets JSON and plain responses. Since the delete endpoint
never advertised its response as JSON, it dodged the filter by accident.

The new control-program path goes through axum and `ImperoErrorWeb<T>`, which
uses `axum::Json`. That sets the JSON content type correctly, which made it
eligible for stripping.

So the working delete endpoint was not evidence that `409` JSON bodies were
generally safe. It worked because it took a different path with different
metadata.

## What I took from it

The dangerous failure mode here was not hallucination. It was a coherent,
code-backed, plausible explanation that was still wrong. That is harder to catch
than nonsense.

In a codebase I don't know well, I need to treat AI-generated root causes as
hypotheses, not conclusions. If the model says "the proxy drops the body", the
next step should not be "fix the proxy". It should be "prove the body exists
before the proxy and disappears after it".

The less I know about an area, the easier it is for the model to steer the
investigation in the wrong direction. It can still sound convincing, but if I
can't judge the assumptions, I'm mostly delegating direction, not just
execution. That is where it wastes the most time.

My rules for next time:

- Don't let a model optimize a theory before the failing layer is proven.
- Prefer small diagnostic checks over large speculative fixes.
- Search for global hooks and middleware early when response behavior is
  surprising.
- Be skeptical when the proposed fix is infrastructure-wide but the symptom is
  narrow.
- In unfamiliar code, ask for a falsification plan before asking for a patch.
- When I know little about the area, use the model to map the system first, not
  to pick the root cause.
- Reset context earlier when the investigation starts orbiting the same theory.

The code change was small. The expensive part was letting a believable story run
too far.
