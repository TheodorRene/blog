+++
title = "Brand your types!"
date = "2024-07-21T17:36:40+01:00"
author = "Theodor René Carlsen (Theo)"
authorTwitter = "theodorc_" #do not include @
cover = ""
tags = ["types", "brands", "tips&tricks"]
description = "Brand your types to avoid stringly typed code"
showFullContent = false
readingTime = false
draft = false
+++

In this years NDC in Oslo I presented my lightning talk on branded types. To
cement this in history forever(!), I have converted it into a blog post as well.
I do recommend watching the
[talk](https://www.youtube.com/watch?v=yahbJV16GmE) as my wit and humor might not
come a cross that well in writing. But also looking back at my talk, I guess
some of my jokes didn't work there either. Oh well, c'est la vie

![Talk](/img/talk.png)

https://www.youtube.com/watch?v=yahbJV16GmE

Slides are also available [online](https://brand-your-types.netlify.app/)


If you just want to know what they are, and how they can be used, just scroll
down to where the code starts. 

There is some preface to this, so hang tight

## Programming languages

I've always loved programming languages. It's how we humans, and more
specifically programmers, interact with the computer. Its not buttons or
sliders, it just text. It's actually a language(wow!). Which fits very well
since we are talking about communication.

I think of programming languages as something made by humans, for humans. The
same comes to writing the code: Its written by me, for another human. I'm trying
to model my mental model into the code, and when another human reads it, this
mental models should manifest in their head. Ugly code or an unreadable
programming language is a bug in my, maybe not so, humble opinion.

That brings us to "semantics"(A great word if you want to sound smart). Because
looking at the code, each "word" or "token", it _means_ something. It has
weight, it makes you feel something, because its not just a list of characters.
The same way a painting is not just a mixture of colors, its a painting. So lets
have a look at the keyword `string`, or more generally the concept "string".
What semantics does it carry to the programmer?


## Strings!

![Talk](/img/stringy_strings.png)

They're great! They are easy (not to be confused with
["simple"](https://www.youtube.com/watch?v=SxdOUGdseq4)) and they are readable!
I mean, I learned to read in second grade and its been very helpful when working
with strings! Since you are reading this, I'm assuming you can too.

They are also printable. I write my code, and add some `console.logs` here and
there, run my code, and wow! The computer talks back?? This is crazy, but fun!

And it can be anything and used for anything. Great! Lets use it everywhere, but
first lets have a look at some strings

## Anything?

### `"Theodor Rene Carlsen"`

My name! Great string, one of the great ones. Love to see it

### `"+4746957236"`

My phone number? Hmm, well I guess so. Phone numbers are more like an primary id
and not something we do any math-like operations one. Certified string

### `"true"`

I know this one! Its a boolean! Or, ehm well, its a string representation of the
word "true", I guess. With that we can have "false" also. Not so sure about this
one, but lets move on

### `"2025-05-14T15:03:28Z"`

A date! I guess we have no better way, that's a string as well

### `"Dalenar could see a highstorm approaching. Its clouds crested the horizon like a rising wave, dark, silent. It was still distant, but it would come. Furious and exact, highstorms were as inevitable as the rising sun. The wood lurched beneath his feet, and Dalenar reached reflexively for the tower’s rail. The battlefield stretched below him, a world of screaming men, metallic rings, and hissing bowstrings...."`

Oh wow, the full The Stormlight Archive series by award winning author Brandon
Sanderson. Honestly a great string, truly recommended. Its long, but yeah, its a
string!

## Total functions

Why am I bringing all this up? I'm just saying that when I write a function, I
want it to be able to handle all possible inputs. I want "total functions". 

Sooo, I have to handle _all_ these strings that I just mentioned when i write a
function?

## This is where branded types comes in!

Using Typescript branded types we add some compile time magic to our string. It
allows us to differentiate between different "types" of strings! And it works
with any type, but are great for primitives like strings and numbers.

This is how it works, but I won't go into details about the syntax right now.
At the end I'll explain each keyword in the two first lines.

```ts
declare const brand: unique symbol;
type Brand<T, B> = T & { [brand]: B };
type UUID = Brand<string, "UUID">;
const id = "1234" as UUID;
```

## Example

![Wavy](/img/wavy.png)

Lets have a look at a simple example (In the talk I have some fancy transitions,
but I'm not sure how do it in my blog yet)

We are creating a simple `login` function that accepts a username and password.
It does some logic with the input and passes it onto a backend call that returns
the result.

```ts
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

Finally we use the function in our codebase. I commit and ask `tsc`: "does this
look good?" `tsc` is like "hell yeah". I never write any tests, so all the tests
are green, I push it to prod and off we go. But wait a minute... My users are
complaining! They can't log into my new shiny chatGPT wrapper??

The issues is, of course, that we have swapped the arguments. The compiler
allowed the "wrong" type of string into the arguments. ❗❗❗ bad compiler
❗❗❗ Maybe we should help it out a bit?

```ts
// utils.ts
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

In this case we branded the username and the password as different "types" of
strings; this way our compiler stops us before we run the tests, CI and deploy
to production. Sweet!

Notice that functions used within `login` can still accept
the branded types, these type signatures have not changed(!).

But you might say, "ehmmm you haven't done anything!". And you are sort of
correct, I've just asserted them as different strings, but whats the best way of
doing this? Maybe we should validate the input before we brand it?

```ts
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
  login(username, parsePassword); // username is now narrowed to Username
}
// do it manually or use a library (zod, io-ts, etc)
```

We can either create a validation function that throws on invalid input or use
type guards. The type guards lets us narrow the type through control logic like
this if-statement. Nice! This is how to do it manually but you can also combine
it with validation libraries like zod, io-ts, arktype etc. They have their own
branding support as well, but I prefer to keep them separate.

## Lets do a real example

I want to show a real life example where it has helped me in my work.

![Talk](/img/app.png)

I work on a newsapp. We fetch data using GraphQL from a backend service owned by
a different team. This services is also used by other clients, like the web
frontpage. The data is used to render the frontpage which includes different
types of "teasers", like articles, videos, podcasts and so on.

The teasers all have a field named `url` of type `string`...

So lets assume that at least its some sort of string (and not Way of Kings or
something), is it relative (`/nyheder/rød-grød-med-fløde`) or absolute
(`https://www.dr.dk/nyheder/rød-grød-med-fløde`)?

In our case its both.

Of course.

In some teasers its relative, some its absolute and some it can be both. So that
is what we are dealing with.

And this is not to talk down our services, this is a case that _will_ happen to
you. Maybe the dependency is internal, like in this case, or it will be an
external API. It happens and in many cases fixing it is not worth the rewrites
across dozens of services. Its like the common norwegian saying:

"C'est la vie".

## So how do we handle this?

This is was our previous code. The stringly type URLs are trickling down and
infesting our codebase. For every function we need to validate if its a valid
URL, and if its relative or absolute.

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
```

We fix this by adding branded types. And by parsing earlier in our codebase we
can narrow the types. Suddenly we don't have to handle all the cases anymore,
and we can just trust the branded type. In more broad terms, instead of
just validating the input, we also parse it. Therefore embedding the validation
result within the type itself. For it to exist, it has to be valid.

```ts
// article.ts
function handleNavigation(url: RelativeUrl) {
  // our logic
}
// externalLinkButton.ts
function addQueryParam(url: AbsoluteUrl) {
  // our logic
}
```

## Conclusion

![Straight string](/img/straight_string.png)

So what have we learned? What do we gain from parsing and adding
branded types to our strings?

- Better typesafety 
- No runtime cost
- Pragmatic wrapper -- still works as the underlying type
- Can be done manually or with a library (zod, io-ts)
- Clearer semantics for reader (be that human or LLM)

Here are some bonus brands that I like to use. This shows that it works for
other types as well. You can definitively get creative with this, just make sure
the rest of your team follows.


```ts
declare const brand: unique symbol
type Brand<Type, BrandName> = Type & { [brand]: BrandName }
type UUID = Brand<string,"UUID">
type Seconds = Brand<number, "Seconds">
type Milliseconds = Brand<number, "Milliseconds">
type Celcius = Brand<number, "Celcius">
type Euro = Brand<number, "Euro">
```

### Bonus explanation

```ts
declare const brand: unique symbol
type Brand<Type, BrandName> = Type & { [brand]: BrandName }
```

What does all this quirky syntax even mean?

An easier to read example is this one

```typescript
type Brand<Type, BrandName> = Type & { __brand: BrandName }
```
Here we are using just a normal key name "__brand". And this works great as
well, and in practice just as well as the first example. The "issue" is that the
same brand can easily be made in another file. We want a single source of truth,
so it doesn't collide with other definitions and possibly other validation
rules. So we need something that is totally unique... 

What about symbols? Symbols are a fun feature in Javascript that can be used to
create "hidden" properties of an object and also avoid collisions 

```typescript
const sym = Symbol("Whatever you want");
// The description does not change anything
const sym2 = Symbol("Whatever you want");
sym === sym2 // false
```

But we don't care about the runtime, we just want it to exist in the Typescript
world. Maybe we can convince Typescript that a unique symbol exists?

The `declare` keyword in Typescript basically gives you the possibility to tell
typescript "trust me this thing exist, just pretend". It will happily oblige.
This is also how `window` is typed in the browser.

In the end we get this!

```ts
declare const brand: unique symbol
type Brand<Type, BrandName> = Type & { [brand]: BrandName }
```

Using this symbol we are telling Typescript exists, we use it as a dynamic key
to create our object that we union with the original type. No other file can
create this type, and it can't possibly exist at runtime. We are safe!!

