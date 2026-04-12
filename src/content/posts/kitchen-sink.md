---
title: "Kitchen Sink: Testing All Components"
date: "2026-04-12T00:00:00+02:00"
description: "A draft post to test all content types and styles"
tags: ["test", "draft"]
draft: true
---

This is a kitchen sink post for testing every type of content element. If it looks good here, it looks good everywhere.

## Headings

### Third level heading

#### Fourth level heading

##### Fifth level heading

## Paragraphs

This is a regular paragraph. It contains **bold text**, *italic text*, ***bold italic text***, ~~strikethrough text~~, and `inline code`. Here's a [link to somewhere](https://example.com) in the middle of a sentence.

This is a second paragraph to test spacing between paragraphs. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.

## Code Blocks

### TypeScript

```typescript
// utils.ts
type Brand<T, B extends string> = T & { __brand: B };

type Username = Brand<string, "Username">;
type Password = Brand<string, "Password">;

function login(username: Username, password: Password): boolean {
  doSomeLogic(username);
  const hash = calculateHash(password);
  return myBackendValidation(username, hash);
}

const username = "theo" as Username;
const password = "hunter2" as Password;
login(password, username);
// Compiler error^^
```

### Python

```python
def fibonacci(n: int) -> list[int]:
    """Generate the first n Fibonacci numbers."""
    if n <= 0:
        return []
    elif n == 1:
        return [0]

    fib = [0, 1]
    for i in range(2, n):
        fib.append(fib[i - 1] + fib[i - 2])
    return fib

# Usage
result = fibonacci(10)
print(f"First 10 Fibonacci numbers: {result}")
```

### Bash

```bash
#!/bin/bash
# Deploy script
set -euo pipefail

echo "Building project..."
bun run build

echo "Deploying to production..."
rsync -avz --delete dist/ user@server:/var/www/blog/

echo "Done! Site is live."
```

### JSON

```json
{
  "name": "blog3",
  "version": "1.0.0",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "astro": "^6.0.0",
    "@webtui/css": "^0.1.0"
  }
}
```

### HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Hello World</title>
</head>
<body>
  <h1>Hello, World!</h1>
  <p>This is a paragraph with a <a href="#">link</a>.</p>
</body>
</html>
```

### CSS

```css
:root {
  --bg: #282828;
  --fg: #ebdbb2;
  --blue: #83a598;
  --green: #b8bb26;
}

body {
  background-color: var(--bg);
  color: var(--fg);
  font-family: monospace;
  max-width: 80ch;
  margin: 0 auto;
}
```

### Plain text (no language)

```
This is a plain code block with no syntax highlighting.
It should still look like a code block.
Just monospace text, nothing fancy.
```

### Long lines (horizontal scroll test)

```typescript
const reallyLongVariableName = someFunction(argumentOne, argumentTwo, argumentThree, argumentFour, argumentFive, argumentSix, argumentSeven);
```

## Inline Code

Here's some `inline code` in a sentence. What about longer inline code like `const result = await fetchData<User>("/api/users")`? And what about `rm -rf /` (don't run that)?

## Blockquotes

> This is a simple blockquote. It should have some visual distinction from regular text.

> This is a longer blockquote that spans multiple lines. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
>
> It even has multiple paragraphs. This is the second paragraph inside the blockquote.

> **Note:** This blockquote starts with bold text, like a callout.

## Lists

### Unordered list

- First item
- Second item
- Third item with some longer text that might wrap to the next line if the viewport is narrow enough
- Fourth item

### Ordered list

1. First item
2. Second item
3. Third item
4. Fourth item

### Nested list

- Parent item one
  - Child item one
  - Child item two
    - Grandchild item
  - Child item three
- Parent item two
  - Child item one

### Task list

- [x] Set up Astro project
- [x] Install WebTUI + Gruvbox theme
- [ ] Polish code block styling
- [ ] Test all components

## Images

![NDC Oslo 2024](/img/ndc_oslo_2024.png)

## Horizontal Rule

---

## Tables

| Feature | Status | Notes |
|---------|--------|-------|
| Blog index | Done | Terminal-style listing |
| Post pages | Done | With Shiki highlighting |
| Talks page | Done | Links to Slidev decks |
| RSS feed | Done | Filters drafts |
| Dark mode | Done | Gruvbox dark only |

## Mixed Content

Here's a paragraph before a code block, followed by a blockquote, to test spacing between different element types.

```typescript
function greet(name: string): string {
  return `Hello, ${name}!`;
}
```

> The above function is simple but effective.

And here's a paragraph after the blockquote, before a list:

- Item one
- Item two
- Item three

## Emphasis combinations

This paragraph has **bold**, *italic*, ***bold italic***, `code`, ~~strikethrough~~, and [links](https://example.com) all in one place.

What about **bold with `code` inside**? Or *italic with `code` inside*?

## Footnote-style content

This post references some external resources[^1] and internal concepts[^2].

[^1]: External resource example
[^2]: Internal concept explanation
