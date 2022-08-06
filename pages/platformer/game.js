tileTypes = {
    WALL:     [26 , 28 , 44 , 255].toString(),
    AIR:      [51 , 60 , 87 , 255].toString(),
    COIN:     [255, 205, 117, 255].toString(),
    ENEMY:    [56 , 183, 100, 255].toString(),
    LAVA:     [177, 62 , 83 , 255].toString(),

    PUSH_OUT: [65 , 166, 246, 255].toString(),
    PUSH_IN:  [41 , 54 , 111, 255].toString(),

    EXIT:     [115, 239, 247, 255].toString(),
    ENTRANCE: [148, 176, 194, 255].toString(),

    PLAYER:   [244, 244, 244, 255].toString()
};
var PushOutVal = 2;
var CoinCount = 0;

var ctx = null;
var entities = [];
var pushers = [];

// Loading
window.onload = function() {
    gameCanvas = document.getElementById("gameCanvas");
    ctx = gameCanvas.getContext("2d");

    generateLevel.levelImage.src = "levels.png";
    generateLevel.levelImage.onload = function() {
        let gl = generateLevel(0, 0);
        
        // Launch the loop
        window.requestAnimationFrame(time => {
            previousTime = time;

            window.requestAnimationFrame(loop);
        });
    }

    document.body.appendChild(generateLevel.canvas);
}

// Entities
class Coin {
    static fy = 0; // Float value
    constructor(x, y) {
        this.pos = [x, y];
    }
    draw() {
        ctx.fillStyle = "rgba(" + tileTypes.COIN + ")";
        ctx.fillRect(this.pos[0] * 10, (this.pos[1]+Coin.fy) * 10, 10, 10);
    }
}

class Monster {
    constructor(x, y) {
        this.pos = [x, y];
    }
    draw() {
        ctx.fillStyle = "rgba(" + tileTypes.ENEMY + ")";
        ctx.fillRect(this.pos[0] * 10, this.pos[1] * 10, 10, 10);
    }
}


generateLevel.canvas = document.createElement("canvas");
generateLevel.canvas.width = 25; generateLevel.canvas.height = 25;
generateLevel.ctx = generateLevel.canvas.getContext("2d");
generateLevel.levelImage = new Image();
generateLevel.levelImage.crossOrigin = "";
generateLevel.levelImage.href = "levels.png";
generateLevel.backgroundCanvas = null
generateLevel.map = null
function generateLevel(x, y) {
    pos = [x * 24, y * 24];
    generateLevel.ctx.drawImage(generateLevel.levelImage, pos[0], pos[1], 25, 25, 0, 0, 25, 25);
    out = {
        map: [], // air = 0, wall = 1, pusherOut = 2, pusherIn = 3, lava = 4, exit = 5, entrance = 6
        levelctx: document.createElement("canvas").getContext("2d")
    }
    out.levelctx.canvas.width = 250;
    out.levelctx.canvas.height = 250;    
    out.levelctx.fillStyle = `rgba(${tileTypes.WALL})`;
    out.levelctx.fillRect(0, 0, 250, 250);
    
    // Clear entities and pushers
    entities = [];
    pushers = [];

    // Loop through the canvas and find the tiles
    for (let y = 1; y < 24; y++) {
        out.map.push([]);
        for (let x = 1; x < 24; x++) {
            let o = [0, 0];
            let col = tileTypes.AIR;
            switch (Array.from(generateLevel.ctx.getImageData(x, y, 1, 1).data).toString()) {
                case tileTypes.AIR:
                    o = [0, 0]; break;
                case tileTypes.WALL:
                    o = [0, 1]; col = tileTypes.WALL;     break;
                case tileTypes.PUSH_OUT:
                    o = [0, 2]; break;
                case tileTypes.PUSH_IN:
                    o = [0, 3]; break;
                case tileTypes.LAVA:
                    o = [0, 4]; col = tileTypes.LAVA;     break;
                case tileTypes.EXIT:
                    o = [0, 5]; col = tileTypes.EXIT;     break;
                case tileTypes.ENTRANCE:
                    o = [0, 6]; col = tileTypes.ENTRANCE; break;

                case tileTypes.PLAYER:
                    o = [1, 0]; break;
                case tileTypes.COIN:
                    o = [1, 1]; break;
                case tileTypes.ENEMY:
                    o = [1, 2]; break;
            }
            if (o[0] == 0) {
                out.map[y-1].push(o[1]);

                if (o[1] == 2 || o[1] == 3) {
                    pushers.push([x, y, o[1]]);
                }
            } else {
                if (o[1] != 0) {
                    entities.push((o[1] == 1) ? new Coin(x, y) : new Monster(x, y));
                }
                out.map[y-1].push(0);
            }
            out.levelctx.fillStyle = "rgba(" + col + ")";
            out.levelctx.fillRect((x)*10, (y)*10, 10, 10);
        }
    }

    generateLevel.backgroundCanvas = out.levelctx.canvas;
    generateLevel.map = out.map;
    return out;
}

var playerPos = [5, 5];
var playerVel = [0, 0];
var playerJump = false;
var playerGrounded = true;

function updatePlayer(dt) {

    speed = (playerGrounded) ? 0.02 : 0.008;
    if (keys[65]) {
        playerVel[0] = -speed;
    } else if (keys[68]) {
        playerVel[0] =  speed;
    }

    playerPos[0] += playerVel[0] * dt;
    playerPos[1] += playerVel[1] * dt;
    playerVel[0] *= ((playerGrounded) ? 10 : dt) * (1/dt);

        
    playerVel[1] += 0.001;
    console.log([Math.round(playerPos[0]/1), Math.round(playerPos[1]/1)])
    if(getSolid([Math.round(playerPos[0]/1), Math.round(playerPos[1]/1)+1])) {
        playerVel[1] = 0;
        playerGrounded = true;
    } else {
        playerGrounded = false;
    }

    // jump
    if (keys[87] && !playerJump) {
        playerVel[1] = -0.025;
        playerJump = true;
    } else if (!keys[87]) {
        playerJump = false;
    }

}

keys = {}

document.onkeydown = function(e) {
    keys[e.which] = true;
}

document.onkeyup = function(e) {
    delete keys[e.which];
}

let previousTime = 0.0;
const loop = time => {
    // Compute the delta-time against the previous time
    const dt = time - previousTime;

    // Update the previous time
    previousTime = time;

    // Update your game
    update(dt);

    // Render your game
    render();

    // Repeat
    window.requestAnimationFrame(loop);

};

update.pushUpdateTime = 0;
function update(dt) {
    console.log(dt)
    // Float up and down with time
    Coin.fy = Math.sin(previousTime / 300) * 0.15 - 0.15;

    // Update the pushers
    if (update.pushUpdateTime > 30) {
        PushOutVal = (PushOutVal == 2) ? 3 : 2;
        update.pushUpdateTime = 0;
    }

    // Update entities
    for(let i = 0; i < entities.length; i++) {
        
        if(entities[i].constructor.name == "Monster") {
            entities[i].pos[0] += 0.005 * dt;
        }
    }
    update.pushUpdateTime++;

    updatePlayer(dt);
}

function render() {
    // Draw the background
    ctx.drawImage(generateLevel.backgroundCanvas, 0, 0);
    for(let i = 0; i < entities.length; i++) {
        entities[i].draw();
    }
    // Draw pushers
    for(let i = 0; i < pushers.length; i++) {
        ctx.fillStyle = "rgba(" + ((PushOutVal == pushers[i][2]) ? tileTypes.PUSH_OUT : tileTypes.PUSH_IN) + ")";
        ctx.fillRect(pushers[i][0] * 10, pushers[i][1] * 10, 10, 10);
    }

    ctx.fillStyle = "rgba(" + tileTypes.PLAYER + ")";
    ctx.fillRect(playerPos[0] * 10, playerPos[1] * 10, 10, 10);
}

function getSolid(pos) {
    tile = 1;
    try {
        tile = generateLevel.map[pos[1] - 1][pos[0] - 1];
    } catch (error) {
        tile = 1;
    }
    console.log(tile);
    return (tile == 1 || tile == PushOutVal);
}