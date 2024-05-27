description: A minesweeper clone, written in Rust with the Macroquad framework. Play online!
---
{box}
{title}# Minesweeper{end}
{body}
<style>
/* when not fullscreen */
.iframe {
  width: 100%;
  height: 450px;
  position: relative;
  margin-top: 1em;
}

/* when fullscreen */
/* data-open is a data attribute. doesn't do anything magic, just another way to target elements */
.iframe[data-open="true"] {
  position: fixed;
  inset: 0; /* shorthand for top, left, bottom, right */
  width: 100%;
  height: 100%;
  z-index: 99999; /* if you want on top of everything this z-index needs to be highest of all */
  margin-top: 0;
}

/* iframe itself should fill the parent div */
.iframe iframe {
  width: 100%;
  height: 100%;
}

/* put the toggle button in the bottom right of iframe */
.iframe-toggle {
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>
<script>
// https://codepen.io/sscooba/pen/OJwjOKP
/* Use a Class so it can easily be used multiple times per page */
class IFrameToggle {
  constructor(iframe) {
    this.iframe = iframe;
    this.toggleButton = this.iframe.querySelector(".js-iframe-toggle");
    this.open = false;

    this.eventHandlers();
    this.update();
  }

  eventHandlers() {
    this.toggleButton.addEventListener("click", () => this.toggle());
  }

  toggle() {
    this.open = !this.open;
    this.update();
  }

  update() {
    // set the data attribute on the HTML element
    this.iframe.dataset.open = this.open;
  }
}

// https://www.reddit.com/r/learnjavascript/comments/114tnlp/comment/j8xwnor/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button
document.addEventListener("DOMContentLoaded", function(arg) {
    /* using a different class to target this than using in CSS. Just to separate concerns */
    document.querySelectorAll(".js-iframe").forEach((iframe) => {
        new IFrameToggle(iframe);
    });
});

</script>
<div class="iframe js-iframe" style="width: 100%;">
<iframe style="image-rendering: pixelated; isolation: isolate; display: block; margin-left: auto; margin-right: auto;"
src="minesweeper.html" allowtransparency="true" frameborder="0" scrolling="no" allowfullscreen></iframe>
<button class="iframe-toggle js-iframe-toggle">Toggle full screen</button>
</div>

This is a game of minesweeper that took around TWO MONTHS for me to make! Two whole months!!!

I learned an awful lot in those two months however, and rewrote it from the ground up a good 3 or so times, so I'd say they weren't two wasted months :3

Left click to dig, right click to flag, and either middle mouse or left + right click to [chord](https://en.wikipedia.org/wiki/Chording#Minesweeper_tactic)!

(pleeeaase, if anyone knows how to disable middle mouse autoscrolling on the minesweeper iframe tell me!!!)
{end}
{end-box}

{box}{body}
## About
This was made in Rust, with the [Macroquad](https://github.com/not-fl3/macroquad/) framework, [The source is on Github](https://github.com/jumbledFox/minesweeper/)!

The hardest part about this project was definitely the GUI. I eventually settled on what's called an 'immediate-mode' GUI, which is basically where everything is rebuilt every frame. This made the code so much easier at the cost of some performance, but meh, it's not the 80s anymore! At least this site isn't mining bitcoin on your cpu... or is it?

---
## Explosions
One part I'm really proud of is the cool circular explosion effect!

<video width="50%" controls>
    <source src="explosions.mp4" type="video/mp4">
    Your browser does not support the video tag, you pillock!
</video>

This was achieved with a bunch of cool optimisations, such as using the squared distance rather than a pesky and slow square root calculation, precalculating all of the distances to the center for each bomb, and using an IndexMap (ordered HashMap) and sorting it by distance to make sure I check the minimum amount of bombs as possible when updating the radius.

Check out the source [here](https://github.com/jumbledFox/minesweeper/blob/master/src/ui/minesweeper_element/exploder.rs), I'm really proud of it! 

---
## The Face In The Button
My code allows me to easily add faces, shown below is part of the spritesheet for them!

<img src="facesprites.png" style="width: 100%; image-rendering: crisp-edges;">

I would add more faces (and may do in the future!) but drawing is hard :c

Originally there was just gonna be a fox in the button, here are some of my first attempts at drawing it....

<div style="margin-bottom: 1em; display: flex; align-items: left;">
<img src="faceattempt1.png" style="max-width: 20%; object-fit: contain; image-rendering: crisp-edges; margin-left: 0; margin-right: 1em;">
<p>Not a fan of this one, too lumpy!</p>
</div>

<div style="margin-bottom: 1em; display: flex; align-items: left;">
<img src="faceattempt2.png" style="max-width: 20%; object-fit: contain; image-rendering: crisp-edges; margin-left: 0; margin-right: 1em;">
<p>The shocked version of the one above, for when you were about to dig up a tile</p>
</div>

<div style="margin-bottom: 1em; display: flex; align-items: left;">
<img src="faceattempt3.png" style="max-width: 20%; object-fit: contain; image-rendering: crisp-edges; margin-left: 0; margin-right: 1em;">
<p>This one's literally just eyes lol</p>
</div>

<div style="margin-bottom: 1em; display: flex; align-items: left;">
<img src="faceattempt4.png" style="max-width: 20%; object-fit: contain; image-rendering: crisp-edges; margin-left: 0; margin-right: 1em;">
<p>Ehh... better, but still not very good!!</p>
</div>

The fox was originally going to look back and forth, this proved to be too distracting and didn't look very good however, so I removed it.

<img src="faceturning.gif" style="max-width: 25%; object-fit: contain; image-rendering: crisp-edges;">

They were also going to be much cooler when you won, sporting an epic pair of shades! However I didn't think it was as cute as the '^^' eyes present in the final release :3

<img src="faceunusedwin.png" style="max-width: 25%; object-fit: contain; image-rendering: crisp-edges;">

---

I used [this codepen project](https://codepen.io/sscooba/pen/OJwjOKP)'s code to add a fullscreen button, thank you Stephen Cronin!

Overall this project was a brilliant learning experience, I'm so excited to make more web-based things with Macroquad :3

May 2024 
{end}{end-box}