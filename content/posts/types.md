+++
title = "Types"
date = "2022-01-17T23:55:39+01:00"
author = ""
authorTwitter = "" #do not include @
cover = ""
tags = ["", ""]
keywords = ["", ""]
description = ""
showFullContent = false
readingTime = false
draft = true
+++

Types is something I've taken for granted in programming languages. They just
exist, and are probably necessary. Gradually when going from dynamically typed
languages (types are not known at compile time), like Python to statically typed
(types are known at compile time) languages like Java I taken to appreciating
types. And I think few people appreciate and understand the importance. This is
my intuition and how I understand types and their importance. Most of it will be
applicable for any programmer but the ideas are quite common when working within
the functional programming paradigm

This post will be affected by my learnings of Haskell the last year.

Types are all about setting boundaries for what a function can take as input and
what it will return on output. Giving limiting types will reduce the amount of
possible input and same with the output type. 

# Partial functions
Functions should be able to handle any input parameters it gets. In many languages this is
not upheld by the compiler but up to the programmer. In most idioms its a bad
practice. In many languages like Python this is done with exceptions. Bad input?
Throw exception and cross your fingers that it's catched somewhere, else the
program will crash and possibly halt. This is not very safe, but very
convenient.


# String and lists
Strings and lists are something you can't live without in a programming language
but at the same time the cause of many problems. What makes these two difficult
is at compile time you don't know much about them. Lets look at an example:

```haskell
data BeatleMember = George | Ringo | Paul | John
data HairCut = Bowlcut | LongHair 
myFunc :: BeatleMember -> HairCut

myOtherFunc :: String -> Int
```

# Pure function are just like a table lookup
BeatleMember have 4 possibilities, HairCut has 2 possibilites. Just by looking
at the type declaration we know that the final set of possible input/output
pairs are $4 * 2 = 8$. (Want an efficiency tip? Since the final set is very
small why can't it just be table lookup? If the function was very compute heavy
this could be a possibility. As long as the function doesn't have any side
effect like checking a database or doing a network request.)

Lets look at myOtherFunc. By looking at the types we know very little about how
it works. Lets pretend that String can only hold 2048 bytes and that Int is 64
bytes. That give $ 2^2048 * 2^64 $ possible input and output pairs. Try to wrap
your head around that!

Most importantly when you are restricting the type you limiting how many states
the function can exist in. If you take in an argument of type BeatleMember your
function only needs to handle 4 different possible inputs. 

## In the end..

Learn some Haskell or some other statically typed functional programming
language. It really changed my views on functions, input, output and how it all
links together. 
