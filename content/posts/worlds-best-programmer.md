+++
title = "10 things holding you back from becoming the worlds best developer"
date = "2024-01-08T17:36:40+01:00"
author = "Theo"
authorTwitter = "theodorc_" #do not include @
cover = ""
tags = ["", ""]
keywords = ["", ""]
description = ""
showFullContent = false
readingTime = false
draft = true
+++

As a last minute addition to a "Tech show n tell" at my previous employer I
quickly put together this list on the top 10 things holding you back from coming
the worlds best developer. I enjoyed making the list so to make sure it doesn't
get lost in void I'm posting it here as well. Its been translated from Norwegian
and some minor adjustments are made so that it works as a blogpost. 

So follow along and make the necessary adjustments so you can be that 10x
developer.


(Also I've moved to Copenhagen. Please get in touch if you are in the city and
want hang. k thx bye)

# 1. You have a functioning Caps lock key

F*ck caps lock. Why would you ever use that. Please bind it to Ctrl and your
wrists will thank me later

# 2. You're not using brands in Typescript
Don't let your code be stringly typed!! Add some compile time differentiation
between your strings:

```ts
type Creds = {
  username: string;
  password: string;
};

function logIn(username: string, password: string) {}
logIn(creds.password, creds.username);
// No error

// Typescript/javascript voodoo magic. Don't worry about it
declare const brand: unique symbol;
// Woohoo
type Brand<T, TBrand> = T & { [brand]: TBrand };
type Username = Brand<string, "Username">;
type Password = Brand<string, "Password">;

type CredsSafe = {
  username: Username
  password: Password;
};
function logIn(username: Username, password: Password){}

logIn(creds.password, creds.username);
<!-- Argument of type 'Password' is not assignable to parameter of type 'Username'. -->
<!--   Type 'Password' is not assignable to type '{ [brand]: "Username"; }'. -->
<!--     Types of property '[brand]' are incompatible. -->
<!--       Type '"Password"' is not assignable to type '"Username"'.(2345) -->
```

(Again you can't differentiate between `Username` and `Password` at runtime, but
its still pretty convenient)

# 3. Your .gitconfig is still the default!!

```bash
# just do `git <ur alias>`
[alias]
unstage = restore --staged # why isn't this already in git??
amend = commit --amend --no-edit # amend, don't reword commmit message
pr = !gh pr create # The github cli is pretty nice! Create PR from the cli.
prview = !gh pr view --web # View pull request in browser
view = !gh repo view --web # View repo in browser
pf = push --force-with-lease # Always --force-with-lease, never --force
prfix = !git commit -a --amend --no-edit && git push --force-with-lease
# -a : Add all tracked files
# --amend: amend to previous commit
# --no-edit: dont prompt for rewording of commit message
# Use this when fixing typos in your code when doing pull requests

[pull]
rebase = true # always rebase
autoStash = true # Basically: git stash && git pull && git stash pop

[push]
autoSetupRemote = true  
# No more "There is no tracking information for the current branch."
# It just does what you expect when pushing commits from a new branch

```

Also add this to your {bash,zsh}.rc
```bash
alias lr="ls -ltrh"
# -t Sort by time, newest first
# -r reverse
# -h human readable size
```

# 4. You do crazy git stuff without doing a backup

Just copy the folder, do crazy stuff in the original folder, if all hell breaks
loose just start over in the backup folder. There is no shame in this! Swallow
your pride! And I'm saying this as person that is above average interested in
git.

# 5. You're try actively to memorize cli commands!!
Just use `Ctrl-r` and search through your history. If you use a command often
enough you will remember it. Anything else is not worth memorizing.

Bonus tip: Use [fzf](https://github.com/junegunn/fzf) for searching.
Bonus tip numero dos: Use Github Copilot Cli

# 6. You're prompt is on a single line!

Add some space! Take a breather

```bash
~ dev/blank/val |main*|
> echo "hello"
"hello" 
```
Lag litt plass!!!!

# 7. You are not using Ctrl+k in Slack

Its so nice. Just try it. It's also supported many other places:
  _ http://react.dev
  _ tailwind
  _ nextjsauth
  _ nextjs 
  - Spotify(!)
  etc etc
  I must warn you that it will be very annoying when a page doesnt implement
  this. 

  Forresten: ctrl+l for å hoppe til urlbar. Or maybe Cmd+l on mac

  (Bonus points for using  vimium to jump to things in the browser)

# 8. You have emails in you email client

And by that I mean, why are you not using inbox zero??? I think this was a big
hype a couple of years ago, but I never stopped. Heres how it works

1. Email comes in
    - Archive if any actions needed to be done, postpone if I can't do anything
      about now or delete it.
      - The peace of mind I get when I open my client and there is no emails
        there is just breathtaking. It means there is nothing I have to do.
        (And yes sometimes an email hangs around. I have currently have like 4
        emails that I have not dealt with)

Also add keybindings in Gmail. You do it in the settings somewhere and then you
can archive by just pressing "e" and navigate with vim-keybindings

# 9 You remember the difference between ?? and || in javascript
    - You are too good, mr/ms phd.
    - Touch grass
    - You should google it like once a week and then double check later when
      submitting the PR

# 10. You are using vim
I have probably saved 27 seconds using Vim over the last 5 years I've used vim.
And I've lost 7 months to configuring stuff and debugging. Just use vscode with
vim keybindings unless you are looking for a new hobby

# 11. Du lager ikke en ny spilleliste hver måned
(also I should use Last.fm, but I'm in a sunk cost (opposite?) where there
are so many years I haven't used it that i feel bad for the lost data) -
I've done this the last 3 year Superbonus: switch up your perfume when your
going into a new era. I'm currently wearing my "first year in
Copenhagen"-cologne. Quite rare!

 ______________
< Takk for meg >
 --------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
