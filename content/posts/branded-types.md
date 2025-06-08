+++
title = "Brand your types!"
date = "2024-01-08T17:36:40+01:00"
author = "Theodor René Carlsen (Theo)"
authorTwitter = "theodorc_" #do not include @
cover = ""
tags = ["10xDeveloper", "programming", "tips&tricks"]
keywords = ["best", "10xDeveloper"]
description = "Brand your types to avoid stringly typed code in Typescript"
showFullContent = false
readingTime = false
draft = true
+++

In this years NDC in Oslo i presented my lightning talk on branded types. To
cement this in history forever I'll try converting it to a blog post as well.
I do recommend watching the talk as my wit and humor might not come a cross that
well in writing(??) (And also looking back at my talk, I guess some of my jokes
did fall flat. Oh well, c'estlavie)

If you just want to know what they are and how they can be used; read section.
There is some storytelling to this

## Programming languages

I've always loved programming languages. It how we humans, and more specifically
programmers, interact with the computer. Its not buttons or sliders, it just
text. Its actually a language! Which fits very well since we are talking about
communication.

And I've always regarded programming languages as something made by humans, and
for humans. The same comes to writing the code: Its written by me, for another
human. I'm trying to model my mental model into the code, and when another human
reads it, this mental models should appear in their head. Ugly code or an
unreadable programming language is a bug in my mind.

That brings us to "semantics". A great word if you want to sound smart. Because
looking at the code each "word" or "token", it _means_ something. It has
weights, it makes me feel something. It not just a list of characters, it means
something. So lets have a look at the keyword "string", or more generally the
concept "string". What semantics does it carry to the programmer?

## Strings!

They're great! They are easy (not to be confused with "simple"LINK), they are
readable! I mean, I learned to read in like 2. grade and its been very helpful
when working with strings! Since you are reading this, I'm assuming you can too.

They are also printable. I write my code, and add some `console.logs` here and
there, run my code, and wow! The computer talks back?? This is crazy, but fun!

And it can be anything and used for anything. Great! Lets use it everywhere, but
first lets have a look at some strings

## Anything?

### "Theodor Rene Carlsen"

My name! Great string, one of the great ones. Love to see it

### "46857236"

My phone number? Hmm, well I guess so. Phone numbers are more like an primary id
and not something we do any math-like operations one. Certified string

### "true"

I know this one! Its a boolean! Or, ehm well, its a string representation of the
word "true", I guess. With that we can have "false" also. Not so sure about this
one, but lets move on

### "2025-05-14T15:03:28Z"

A date! I guess we have no better way thats a string as well

### "Dalenar could see a highstorm approaching. Its clouds crested the horizon like a rising wave, dark, silent. It was still distant, but it would come. Furious and exact, highstorms were as inevitable as the rising sun. The wood lurched beneath his feet, and Dalenar reached reflexively for the tower’s rail. The battlefield stretched below him, a world of screaming men, metallic rings, and hissing bowstrings...."

Oh wow, thats the full stormlights archives series by award winning author Brandon
Sanderson. Honestly a great string, truly recommended. Its long, but yeah, its
a string!

## Total functions

Why am I bringing all this up? I'm just saying that when I write a function, I
want it to be able to handle all possible inputs. I want "total functions". I
guess I have to handle all these strings that I just mentioned when i write a
function?

## This is where branded types comes in!

Using Typescript branded types we add some compile time magic to our string. It
allows us to differentiate between different "types" of strings! Its actually
quite convenient. And it works with any type, but are great for primitives like
strings and numbers.

This is how it works, but I won't go into details about the syntax right now.
At the end I'll explain each keyword in the two first lines.

```ts
declare const brand: unique symbol;
type Brand<T, B> = T & { [brand]: B };
type UUID = Brand<string, "UUID">;
const id = "1234" as UUID;
```

## Example

Lets have a look at a simple example (In the talk i have some transitions, but
I'm not sure how do it in my blog yet, would love to do it though)

We are creating a simple `login` function that accepts a username and password.
It does some logic with the input and passes it onto a backend call that returns
the result.

```ts {linenos=inline hl_lines=[3,"6-8"] style=emacs}
// utils.ts
function login(username: string, password: string): boolean {
  doSomeLogic(username);
  const hash = calculateHash(password);
  return myBackendValidation(username, hash);
}

const username = "theo";
const password = "hunter2";
login(password, username);
```

Finally we use the function in our codebase, I commit it, I ask `tsc`, does this
look good? `tsc` is like "hell yeah". I never write any tests, so all the tests
are green, I push it to prod and off we go. But wait a minute... My users are
complaining! They can't log into my new chatGPT wrapper TM??

The issues if of course that we have swapped the arguments. The compiler allowed
the "wrong" type of string into the arguments. !!! bad compiler !!! or
programmer maybe

```ts {linenos=inline hl_lines=[3,"6-8"] style=emacs}
// utils.ts
function login(username: Username, password: Password): boolean {
  doSomeLogic(username);
  const hash = calculateHash(password);
  return myBackendValidation(username, hash);
}

const username = "theo" as Username;
const password = "hunter2" as Password;
login(password, username);
// Compile error^^
```

In this case we branded the username and the password as different strings, this
way our compiler stops us before we run the tests, CI and deploy to production.
Sweet!

But you might say, "ehmmm you haven't done anything!". And you are sort of
correct, I've just asserted them as different strings, but whats the best way of
doing this?

```ts {linenos=inline hl_lines=[3,"6-8"] style=emacs}
// brands.ts
declare const brand: unique symbol;
declare type Brand<T, B> = T & { [brand]: B };

export type Username = Brand<string, "Username">;
export type Password = Brand<string, "Password">;

// parse.ts
export function parsePassword(password: string): Password {
  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters long");
  }
  return password.trim() as Password;
}
export function isValidUsername(username: string): username is Username {
  return username.length > 0;
}
const parsedPassword = parsePassword(password);
if (isValidUsername(username)) {
  login(username, parsePassword);
}
// do it manually or use a library (zod, io-ts, etc)
```

We can either create a validation function that throws on invalid input or use
type guards. The type guards lets us narrow the type through control logic like
this if-statement. Nice! This is how do it manually but you can also combine it
with validation libraries like zod, io-ts, arktype etc. They have their own
branding support as well, but I prefer to keep them separate.

## Lets do a real example

I want to show a real life example where it has helped me in my work.

I work on a newsapp. We fetch data using Graphql from a backend service owned by
a different team. This services is also used by other clients, like the web
fronpage. The data is used to render the frontpage which includes different
types of "teasers".

The teasers all have a field named "URL" and its of type string... So lets
assume that at least its some sort of string (and not Way of Kings or
something), is it relative(`/nyheder/rød-grød-med-fløde`) or absolute(`https://www.dr.dk/nyheder/rød-grød-med-fløde`)?

In our case its both of course. In some teasers its relative, some its absolute
and some it can be both. So yeah, thats what we are dealing with.

And this is not to talk down our services, this is a case that _will_ happen to
each every one of you. Maybe the dependency is internal in this case or it will
be an external API. It happens and in many cases fixing it is not worth the
rewrites across dozens of services. Its like the common norwegian saying "C'est la vie".


```ts
// article.ts
function handleNavigation(url: string) {
  // validate your inputs
  if (url === "") {
    // handle invalid URL
  }
  if (isRelativeUrl(url)) {
    // handle relative URL
  }
  if (isAbsoluteUrl(url)) {
    // handle absolute URL
  }
  // our logic
}
// externalLinkButton.ts
function addQueryParam(url: string) {
  // validate your inputs
  if (url === "") {
    // handle invalid URL
  }
  if (isRelativeUrl(url)) {
    // handle relative URL
  }
  if (isAbsoluteUrl(url)) {
    // handle absolute URL
  }
  // our logic
}

// shareButton.ts
function createShareableLink(
  url: string,
): string {
  // validate your inputs
  if (url === "") {
    // handle invalid URL
  }
  if (isRelativeUrl(url)) {
    // handle relative URL
  }
  if (isAbsoluteUrl(url)) {
    // handle absolute URL
  }
}
