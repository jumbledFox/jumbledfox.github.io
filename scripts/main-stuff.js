gsap.to("html", {
    keyframes: {
        "0%"  : { "--color-rainbow": "69 , 163, 229" },
        "12%" : { "--color-rainbow": "51 , 204, 204" },
        "25%" : { "--color-rainbow": "102, 191, 57 " },
        "38%" : { "--color-rainbow": "255, 166, 2  " },
        "50%" : { "--color-rainbow": "235, 103, 15 " },
        "62%" : { "--color-rainbow": "255, 51 , 85 " },
        "76%" : { "--color-rainbow": "134, 76 , 191" },
        "100%": { "--color-rainbow": "69 , 163, 229" }
    },
    duration: 7,
    repeat: -1,
    ease: "none"
});

$(document).ready(function() {
    var flyholder = $('#fly-holder');

    var delay = 500,
        defaultAmount = 13;
    function makeNewFox() {
        var
        scale = "scale(" + rand(0.5, 1) + ")",
        top = rand(0, 100) + "%",
        opacity = rand(0.05, 0.1),
        index = rand(-49, -29),
        duration = rand(10, 15),
        fromLeft = Math.round(rand(0, 1));
        
        var fox = $("<div></div>").css({
            "top": top,
            "opacity": opacity,
            "transform": scale,
            "animation-duration": duration - 0 + "s",
            "z-index": index
        });
        fox.addClass("foxhead");
        fox.addClass(fromLeft ? "foxl" : "foxr");

        flyholder.append(fox);

        setTimeout(function() {
            makeNewFox();
            fox.remove();
        }, duration * 1000);
    }

    for (var i = 0; i < defaultAmount; i++) {
        setTimeout(makeNewFox, delay * i);
    }

});

function rand(min, max)
{
	return Math.random() * (max - min) + min;
}