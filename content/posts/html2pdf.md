+++
title = "Html2pdf"
date = "2023-01-26T19:59:45+01:00"
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

# TODO Better english

# Resources

--Great resource https://excessivelyadequate.com/posts/print.html

# Generating PDFs, the easy way

Generating pdfs in software solution pop ups here and there. Generating schemas,
reports or CV. One of the ways you can do this is custom pdf-generators with
templating. You choose a template and send the data with it. Another solution
is using the pdf-generation capabilities of your browser.

Most solutions use chromium through Puppeteer. If you have chromium installed
you can do it directly using:

`chromium --headless --disable-gpu -run-all-compositor-stages-before-draw --virtual-time-budget=100000 --print-to-pdf --print-to-pdf-no-header`

Using the print dialog of your browser is also possible, but be careful to use
chromium. Working on firefox, then switching to chromium showed that the
rendering handled breaking of the pages differently. You need
virtual-time-budget to let the javascript do its rendering, remove it if your
application does not need javascripthydration.


## Digression 
A site that would normally would be rendered as 7 pages was up 30k pages.
This was a chromium bug: https://bugs.chromium.org/p/chromium/issues/detail?id=1161709


## Correct breaking of pages
Some modules you would probably prefer not be broken over pages. Using
`break-inside-avoid`` the renderer tries to avoid this. A caveat is that the
attribute wont work properly within a element that uses `flex` or `grid`

# Pages and the endless page
See github repo. It will include a single A4Page component and an endless page
component if the data is dynamic and the number of pages is unknown.


## Margins

Develop for maximal effiency and developer experience. There we stick with
default chromium margins. But we want the browser to reflect the result
somewhat, there we add some css that wont be rendererd. This is done using
:print tag. The shadow is added as well

## Generation

This is a painpoint. From collegas using Puppeteer is quite compute intensive
and usually needs its own infrastructure. You would probably hit some Lambda
memory limit, since you are literally running chromium in it. You have two
solutions: running chromium or paying for a saas. In the saas market there are
two possibilities: Some only support css and html in the body, but other support
rendering a pdf from a url.

## Using your API

# Fin
Hope the tips were helpful, send me a tweet if you have any questions

