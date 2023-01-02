+++
title: "My top 5 Neovim plugins for 2023"
date = "2023-01-02T16:04:00+01:00"
author = "Theodor "
authorTwitter = "theodorc_" #do not include @
cover = ""
tags = ["neovim", "cli", "config"]
keywords = ["", ""]
description = ""
showFullContent = false
readingTime = true
draft = true
+++

# 5 plugins for neovim in 2023

I finally finished my master thesis this june (will write a post on it
someday), and started in working in a "real" job in august. The project that I
was put on was a brand new nextjs project with
typescript+tailwind+hasura(postgres). Initally I started using vscode, but was
hitting its limits on configurability. One friday night i rewrote my neovim
config into lua, and now I'm working on honing the config until I get the most
comfy editing setup. Enough talk here is my list on great neovim plugins (mostly
written in lua) out of my now 40ish installed plugins. (I assume you have LSP
setup so I will not highlight basic LSP-plugins in this post)

## Neoscroll

Vertical movement has and is my limiting factor when it comes to speed. I've
tried using `ctrl+d` and `ctrl+u` for page up and down, and also `ctrl+e` and
`ctrl+y` for scrolling by lines but I always get dizzy and disoriented. The
first step in fixing this is a tip from [thePrimagen]("https://www.youtube.com/channel/UC8ENHE5xdFSwx71u3fDH5Xw"):

```lua
nmap('<C-u>', '<C-u>zz')
nmap('<C-d>','<C-d>zz')
```

This remapping keeps the cursor in the middle of the screen when going page up
and down.

```lua
vim.o.scrolloff = 8
```

This options makes it so that the buffer starts scrolling earlier to always show
8 lines above or under the cursor. If you are still unsure what this does
remember vim/nvims help pages are pretty good `:h scrolloff`

The plugin we are talking about will give a smooth scroll when using these
scrolling keybindings; mimicking the act of scrolling with a mouse. Much more
pleasant for the eye, and nice when that sort of exploration of the file is
needed.

## Leap

Another plugins thats helped with my vertical speed is
[Leap]("https://github.com/ggandor/leap.nvim"). It adds a new motion using `s`
("leap" forwards) and `S` ("leap" backwards). pressing `s` and two characters it
will jump to the first occurence of that pair of characters. With duplicates it
shows you a third characted to press to leap to that destination. It feels like
magic when you use it since you look at where you want to go, do the keystrokes,
and boom you're there.

## Neogit/Gitsigns/Diffviewer

I'm cheating I know, and I should probably do a whole post on working with git
inside vim. Git is actually something I enjoy working with. I currently have 26
aliases in my .gitconfig and some other configs to use
[difftastic]("https://difftastic.wilfred.me.uk/") as my external difftool and
vscode as my mergetool(haven't gotten there with neovim yet). So ill keep this
short.

### Git signs

- Gives a new motion: Jump between hunks
- Easily stage and unstage hunks
- Show new or deleted lines

### Diffviewer

- Nice diffviewer (duh)
- Works with Neogit

### Neogit

- An attempt to create Magit in Neovim
- Nice keybinds for basic and advanced operations

## Telescope

This plugin is a given if you have ever delved into neovim configuration. Its
building itself up a standard way of picking things from a list when using
neovim. Its made by one on the neovim maintainers and is a solid piece of work
with many integrations. These are the ones I use:

## Which-key

With all these plugin I've hit a roof on what my feeble brain can contain of
keybindings. What I've started to do is to namespace actions with a certican
`ctrl+char` command. Maybe not the most popular route, looks very emacsy, but
I'm not a big fan of using the leader key since it feels to slow. An example is
all git related actions are grouped under `ctrl+g`:

```lua
nmap('<C-g>s', '<CMD> Git status <CR>', "GIT: status")
nmap('<C-g>w', ':vsplit term://git status <CR>', "GIT: status")
nmap('<C-g>p', '<CMD> Git pull  <CR>', "GIT: Pull")
nmap('<C-g>do', '<CMD> DiffviewOpen <CR>', "GIT: Show diff")
nmap('<C-g>dq', '<CMD> DiffviewClose <CR>', "GIT: Close diff")
nmap('<C-g>g', ':Git ', "GIT")
nmap('<C-g>dd', '<CMD> DiffviewOpen develop...HEAD <CR>', "GIT: Diff develop")
nmap('<A-g>', '<CMD> Neogit <CR>', "Neogit") -- Except for this one
-- Gitsigns mappings, see gitsigns documentation on where they should be placed
-- as gs is not in scope in this example
map({'n', 'v'}, '<C-g>hs', ':Gitsigns stage_hunk<CR>', {desc='stage hunk'})
map({'n', 'v'}, '<C-g>hr', ':Gitsigns reset_hunk<CR>', {desc='reset hunk'})
map('n', '<C-g>hu', gs.undo_stage_hunk, {desc='undo stage hunk'})
map('n', '<C-g>td', gs.toggle_deleted, {desc='toggle deleted lines'})
map('n', '<C-g>tl', gs.toggle_linehl, {desc='toggle line highlight'})
```

When I press `ctrl+g` alone a HUD will showing, display all possible
actions.What you might have noticed is that there is a `desc` options for each keymap.
This information is displayed in the hud. See image under:

## End

These were my plugins. Let me know if you have any tips of other plugins I
should use. The once I use now can be found on my github. In the future I want
to have a smoother Vim-session experience, and maybe a more visually apealling
way of working with lsp-features(renaming etc)
