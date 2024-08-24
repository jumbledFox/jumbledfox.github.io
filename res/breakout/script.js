// PLEASE please don't look at my awful js code!! it's really really bad and i hate javascript!
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// you have been warned...
// also.. nice to see someone digging around my website! do say hi!

let array = null;

window.onload = function() {
    // Stop the canvas from being right-clicked on
    var canvas = document.getElementById("glcanvas");
    canvas.oncontextmenu = function(e) { e.preventDefault(); e.stopPropagation(); }
};

// Will be called when wasm_exports and wasm_memory will be available
function on_init() {
    // Add the default files
    var default_levels = ["SPACE.brk", "ALBUMS I LIKE.brk", "GAMES.brk", "ANIMALS.brk"]
    for (var i = 0; i < default_levels.length; i++) {
        let name = default_levels[i];
        const url = "packs/" + name;
        load_level_file(url, i == 0);
    }

    // Make it so the file input can set the array to something whenever it's loaded a new file!!!
    document.getElementById('fileInput').addEventListener('change', function(event) {
        for (let i = 0; i < event.target.files.length; i++) {
            const file = event.target.files[i];
            if (file) {
                if (file.name.split('.').pop().toLowerCase() == "brk") {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const arrayBuffer = e.target.result;
                        // Add this levels buttons and code
                        add_level_button(arrayBuffer, true, event.target.files.length === 1);
                    };
                    reader.readAsArrayBuffer(file);
                } else {
                    console.warn('Tried to load invalid file lololol good luck!');
                }
            } else {
                console.error('No file selected');
            }
        }
    });
}

async function load_level_file(url, load) {
    // thanks chat gpt.. i hate javascript
    try {
        // Step 1: Fetch the content from the URL
        const response = await fetch(url);
        
        // Check if the response is ok (status in the range 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Step 2: Convert the response to a Blob
        const blob = await response.blob();

        // Step 3: Create a File object from the Blob
        // You can specify a filename and a type
        const file = new File([blob], "downloadedFile", { type: blob.type });

        // Step 4: Use the FileReader to read the file
        const reader = new FileReader();

        // Define what happens when the file is read
        reader.onload = function(e) {
            const arrayBuffer = e.target.result;
            add_level_button(arrayBuffer, false, load);
        };
        reader.readAsArrayBuffer(file);
    } catch (error) {
        console.error("Error loading file from URL:", error);
    }
}

function add_level_button(arrayBuffer, closable, load) {
    let view = new Uint8Array(arrayBuffer);
    let name_bytes = [];
    for (var i = 0; i < 16; i++) {
        if (view[i] != 255) {
            name_bytes.push(view[i]);
        } else {
            break;
        }
    }
    let name = String.fromCharCode(...name_bytes);
    let author_bytes = [];
    for (var i = 16; i < 32; i++) {
        if (view[i] != 255) {
            author_bytes.push(view[i]);
        } else {
            break;
        }
    }
    let author = String.fromCharCode(...author_bytes);


    var buttons = document.getElementById("levels");
    var btn = document.createElement("BUTTON");  //<button> element
    btn.appendChild(document.createTextNode(name)); 
    var by = document.createElement("span");
    by.textContent = " By ";
    by.className = "levelby";
    btn.appendChild(by);
    btn.appendChild(document.createTextNode(author));

    btn.onclick = function() {
        array = new Uint8Array(arrayBuffer);
        wasm_exports.set_try_flag();
    }

    if (closable) {
        var deletebtn = document.createElement("BUTTON");  //<button> element
        deletebtn.arialabel='delete item'
        var x = document.createTextNode("X"); // Create a text node
        deletebtn.appendChild(x);
        deletebtn.className = "deletelevel";

        deletebtn.onclick = function() {
            this.parentNode.remove();
        }
    }
    
    var d = document.createElement("DIV");
    d.className = "buttoncontainer";
    d.appendChild(btn);

    if (closable) {
        d.appendChild(deletebtn);
    }

    buttons.appendChild(d);

    if (load) {
        btn.click();
    }
}

register_plugin = function (importObject) {
    // make the function available to call from rust
    importObject.env.js_send_level_bytes = js_send_level_bytes;
    importObject.env.js_recv_level_bytes = js_recv_level_bytes;
}

// register this plugin in miniquad, required to make plugin's functions available from rust
miniquad_add_plugin({ register_plugin, on_init });

function js_send_level_bytes() {
    if (array == null) {
        return -1;
    }
    return js_object(array);
};

function js_recv_level_bytes(bytes) {
    const byteArray = consume_js_object(bytes);

    let view = new Uint8Array(byteArray);
    let pack_name_bytes = [];
    for (var i = 0; i < 16; i++) {
        if (view[i] != 255) {
            pack_name_bytes.push(view[i]);
        } else {
            break;
        }
    }
    let pack_name = String.fromCharCode(...pack_name_bytes);

    // ChatGPT wrote this... thanks AI! :3
    // Create a Blob from the byteArray
    const blob = new Blob([byteArray], { type: 'application/octet-stream' });

    // Create a link element
    const link = document.createElement('a');

    // Create a URL for the Blob and set it as the href attribute
    link.href = URL.createObjectURL(blob);

    // Set the download attribute with the desired file name
    link.download = pack_name + ".brk";

    // Append the link to the body (it's necessary to append it to trigger a click event in some browsers)
    document.body.appendChild(link);

    // Trigger a click event on the link to download the file
    link.click();

    // Clean up by revoking the object URL and removing the link
    URL.revokeObjectURL(link.href);
    document.body.removeChild(link);
}
