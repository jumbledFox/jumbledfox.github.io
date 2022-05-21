function include(file) {
  
    var script  = document.createElement("script");
    script.src  = file;
    script.type = "text/javascript";
    script.defer = true;
    
    document.head.appendChild(script);
}
    
/* Include Many js files */
include("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/gsap.min.js");
include("https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js");
include("https://cdn.jsdelivr.net/remarkable/1.7.1/remarkable.min.js");

/* Add style sheet */
var cssFile = document.createElement("link");
cssFile.setAttribute("rel", "stylesheet");
cssFile.setAttribute("href", "styles.css");
document.head.appendChild(cssFile);

window.onload = () => {
    include("script.js");

    let divsToAdd = ["fly-holder", "gradient", "centerer"];

    for (let i = 0; i < divsToAdd.length; i++) {
        let divToAdd = document.createElement("div");

        divToAdd.setAttribute("id", divsToAdd[i]);

        document.body.appendChild(divToAdd);
    }

    $("#centerer").prepend("<div></div>");
    $("#centerer").prepend("<div id='main-container'></div>");
    $("#centerer").prepend("<div></div>");


    // Load markdown

    const md = new Remarkable({html:true});
    var markdown = md.render("# Hello, world! \r\spoo");

    $("#main-container").append(markdown);
}