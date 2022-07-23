// This loads all of the stuff like the style sheet, rainbow text, favicon, gradient, etc.
document.writeln("<link rel='stylesheet' href='/css/style.css'>");
document.writeln("<link rel='icon' type='image/x-icon' href='' id='favicon'>");

let scripts = ["https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/gsap.min.js", "https://cdn.jsdelivr.net/remarkable/1.7.1/remarkable.min.js"];
for (let i = 0; i < 2; i++) {
    var x = document.createElement('script');
    x.src = scripts[i];
    document.getElementsByTagName("head")[0].appendChild(x);
}

var setuptimes = 0;
function setup() {
    if(setuptimes == 0) {
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
    }
    document.getElementById("favicon").href = "/images/favicon.png";

    var anchors = document.getElementsByTagName("a");

    for (var i = 0; i < anchors.length; i++) {
        if (anchors[i].href.startsWith(window.location.origin)) { // if the link is a local link
            if(!anchors[i].href.split(window.location.origin)[1].startsWith("/pages")) { // If it doesnt start with /pages
                // change it to not redirect anywhere and instead load the correct page
                const hr = anchors[i].href.split(window.location.origin)[1];
                anchors[i].onclick = (event) => { event.preventDefault(); loadpage(hr); }
            }
        }
    }

    setuptimes++;
}