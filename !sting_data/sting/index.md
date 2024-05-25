description: My markdown to HTML website generator, written in Rust!
---
{box}
{title}# Sting{end}
{body}
Sting is a program a I wrote in Rust that turns a bunch of markdown files into a bunch of HTML files.

I use it to generate my website! Writing a bunch of HTML files is awful as there's loads of boilerplate, Sting makes this so much easier for me!

It automatically generates the [breadcrumbs](https://en.wikipedia.org/wiki/Breadcrumb_navigation) at the top of the page, too.

---

Here's an example of a Sting markdown file. At the top you define configs, like the page title and the background.

These configs get replaced with their value (or a default value, specified in [default_config.md](/!sting_data/default_config.md))

Below that is the actual page content, specified with a mixture of regular markdown and special tags like '\{box}' and '\{body}'.

These special tags just get turned into HTML divs before parsing, and are only there to make my life a bit easier. For example, '\{box}' turns into '\<div class="box">' and '\{end}' turns into '\</div>'

<div style="isolation: isolate; background: #00000080; border-radius: 1em; padding: 0.1em 1em 0.1em 1em; overflow: auto;">

```
title: Example sting page!!!!
background: /res/images/gradients/neon.png
---
\{box}  
\{title}# Hello!\{end}  
\{body}  
Example page with some text and stuff.
\{end}  
\{end-box}  
```
</div>

This would result in a page that looks like [this](example-sting-page)!

---

You can see this page's markdown file [here](/!sting_data/sting/index.md)!

{end}
{end-box}

{box}{body}
The source is on [Github](https://github.com/jumbledFox/sting)! I originally wrote it a while ago but it really sucked, so I decided to rewrite it and it took 2 days.

It's named after Sting from The Police, because I was listening to them while writing the original code :P

May 2024
{end}{end-box}