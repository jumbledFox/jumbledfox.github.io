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
        duration = rand(8, 12),
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