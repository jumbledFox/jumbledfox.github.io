document.writeln("<link rel='stylesheet' href='css/style.css'>");
document.writeln("<link rel='icon' type='image/x-icon' href='images/favicon.png'>");

document.writeln("<script src='https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/gsap.min.js'></script> <!-- GSAP - rainbow -->");
document.writeln("<script src='https://cdn.jsdelivr.net/remarkable/1.7.1/remarkable.min.js'></script> <!-- Remarkable - markdown -->");

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

var gradient = document.createElement('div');
gradient.id = "gradient";
document.body.appendChild(gradient);