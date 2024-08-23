description: A breakout game with custom levels and an editor, written in Rust with the Macroquad framework. Play online!
---
{box}
{title}# Breakout{end}
{body}

<style>
    @font-face {
        font-family: "jumbledBreakout";
        src: url("jumbledBreakout.ttf");
    }
    #levelSelector *, .mycoolfont {
        font-family: "jumbledBreakout";
        text-align: center;
        font-size: 16px;
        color: white;
    }
    #levelSelector {
        width: 30em;
        padding-left: 0;
        padding-right: 0;
        margin-left: auto;
        margin-right: auto;
        display: block;
    }
    #levelSelector h2 {
        text-align: center;
        font-size: 32px;
        margin-top: 0.2em;
        margin-bottom: 0.2em;
    }
    #levels {
        background-color: black;
        height: 10em;
        min-width: 30em;
        width: 100%;
        overflow-y: scroll;
    }

    #levels .buttoncontainer {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    #levels button {
        text-align: left;
        width: 100%;
        border: none;
        background-color: black;
        color: white;
    }
    #levels button:hover {
        background-color: gray;
    }
    #levels .levelby {
        color: lightgray;
    }
    #levels button.deletelevel {
        text-align: center;
        width: 2em;
        padding-left: 0.4em;
        isolation: isolate;
        border: none;
        background-color: red;
        color: white;
    }
    #levels button.deletelevel:hover {
        background-color: white;
        color: red;
    }

    #fileInputButton {
        text-align: left;
        width: 100%;
        border: none;
        background-color: gray;
        color: white;
    }

    #fileInputButton:hover {
        background-color: white;
        color: gray;
    }

    #glcanvas {
        width: 576px;
        height: 630px;
        isolation: isolate;
        padding-left: 0;
        padding-right: 0;
        margin-left: auto;
        margin-right: auto;
        display: block;
    }
</style>

<canvas id="glcanvas" tabindex='1'></canvas>
<div id="levelSelector">
    <h2>Level pack selector</h2>
    <div id="fileInput">
        <button id="fileInputButton" onclick="document.getElementById('getFile').click()">CLICK TO UPLOAD LEVEL PACKS...</button>
        <input type='file' id="getFile" style="display:none" multiple>
    </div>
    <div id="levels">
    </div>
</div>

<script src="mq_js_bundle.js"></script>
<!-- Minified and statically hosted version of https://github.com/not-fl3/sapp-jsutils/blob/master/js/sapp_jsutils.js -->
<!-- sapp_jsutils is miniquad plugin for more convinient js interop -->
<script src="https://not-fl3.github.io/miniquad-samples/sapp_jsutils.js"></script>
<!-- JS code we want to use in our app -->
<script src="script.js"></script>

<script>load("breakout.wasm");</script></body>

If you make any cool level packs, send them to me on like discord or email and I could feature them on this page!

I'd love to see other people's levels up here :3

Not mentioned in the actual game, but you can pause mid-play by pressing ESC!

{end}
{end-box}

{box}{body}
## About

This is my breakout game, made in Rust with [Macroquad](https://github.com/not-fl3/macroquad/), my utter beloved <3<3<3.

I wrote it in about a week after a sudden spark of inspiration one late night.

The part I'm most proud of is the level editor, as well as taming the beast that is JavaScript to make this all possible on the web. (I got a LOT of help from the lovely folks on the Macroquad discord, as well as the actual library doing basically all of the heavy lifting... but it was still hard!!)

There aren't many screenshots of it being early in development, however there are THESE unused powerups which you might get a kick out of.
<img src="unused-powerups.png" style="width: 100%; image-rendering: crisp-edges;">

What could they do? Who knows.. I don't :P

---

I also turned the in-game font into an actual TTF font, for the lovely level selector seen above.

<span class="mycoolfont">look at it go! yippee!! :3</span>

I used [this really brilliant](https://yellowafterlife.itch.io/pixelfont) tool by someone called [YellowAfterlife](https://yellowafterlife.itch.io/) on itch.io, thank you!

---

Like I said before, if you make any cool level packs, send them my way!

I'd love to have other people's levels up on this page, it'd be really really neat.

---

Also, this was made in a week and the GUI code gets rather shabby, I wasn't in the mood for making a whole GUI library (yet) so I used a few hacky solutions, but they're relatively harmless, self-contained, and they WORK!

{end}
{end-box}