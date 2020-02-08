// matrix

matrix = [];
for (var a = 0; a < 25; a++) {
    matrix[a] = []
    for (var b = 0; b < 25; b++) {
        matrix[a][b] = 0
    }
}
var n = 0;
for (var i = 1; i < 6; i++) {
    var d;
    switch (i) {
        case 1:
            d = 100;
            break;
        case 2:
            d = 1;
            break;
        case 3:
            d = 1;
            break;
        case 4:
            d = 2;
            break;
        case 5:
            d = 1;
            break;
        case 6:
            d = 1;
            break;
        case 7:
            d = 1;
            break;
        default:
            break;
    }

    while (n < d) {
        var x = Math.floor(Math.random() * 20);
        var y = Math.floor(Math.random() * 20);
        if (matrix[y][x] == 0) {
            matrix[y][x] = i;
            n++;
        }

    }
    n = 0;
}

var music;

var side = 20;

var snow = false;

var clrsGrass = ["#32a852", "#2e994b", "#288a42"]
var clrsGrassSnow = ["#edf1f2", "#b5ebff", "#b5d0ff"]


// Arrays
var predatorArr = [];
var grassArr = [];
var grEaterArr = [];
var boxArr = [];
var DestArr = [];
var WormArr = [];
var HoleArr = [];

var grEaterSounds;
var destSounds;
var box1;
var box2;
var box3;
var pred;

var NoSounds = false;

var volume = 1;
var MSCvolume = 1;

function preload() {
    soundFormats('wav', 'mp3');
    // Sounds

    grEaterSounds = loadSound("sounds/grassEater.wav");
    pred = loadSound("sounds/predator.wav");
    box1 = loadSound("sounds/1.wav");
    box2 = loadSound("sounds/2.wav");
    box3 = loadSound("sounds/3.wav");
    destSounds = loadSound("sounds/destroyer.wav");

    // script.js - i "music" file
    music = loadSound("sounds/Super Mario.mp3");
}


function setup() {
    frameRate(10);
    createCanvas(matrix.length * side, matrix.length * side);
    background('#acacac');

    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                var grEater = new GrassEater(x, y, 2);
                grEaterArr.push(grEater);
            }
            else if (matrix[y][x] == 3) {
                var predator = new Predator(x, y, 3);
                predatorArr.push(predator);
            }
            else if (matrix[y][x] == 4) {
                var box = new Box(x, y, 4);
                boxArr.push(box);
            }
            else if (matrix[y][x] == 5) {
                var destroyer = new Destroyer(x, y, 5);
                DestArr.push(destroyer);
            }
            else if (matrix[y][x] == 6) {
                var worm = new Worm(x, y, 6);
                WormArr.push(worm);
            }
            else if (matrix[y][x] == 7) {
                var blhole = new Hole(x, y, 7);
                HoleArr.push(blhole);
            }
        }
    }

}

function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                if (snow) {
                    fill(random(clrsGrassSnow));
                } else {
                    fill(random(clrsGrass));
                }
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            } else if (matrix[y][x] == 3) {
                fill("red");
            } else if (matrix[y][x] == 4) {
                fill(boxArr[0].color);
            } else if (matrix[y][x] == 5) {
                fill(DestArr[0].color);
            } else if (matrix[y][x] == 6) {
                fill("#a13e00");
            } else if(matrix[y][x] == 7){
                fill("#000000");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            rect(x * side, y * side, side, side);
        }
    }

    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grEaterArr) {
        grEaterArr[i].eat();
    }
    for (var i in predatorArr) {
        predatorArr[i].eat();
    }
    for (var i in WormArr) {
        WormArr[i].move();
    }
    for (var i in HoleArr) {
        HoleArr[i].eat();
    }
    for (var i in boxArr) {
        boxArr[i].Generate();
    }
    for (var i in DestArr) {
        DestArr[i].starting();
    }

    var n = random(0, 25);
    n = parseInt(n);

    var m = random(0, 25);
    m = parseInt(m);

    if (grassArr.length <= 10 && matrix[n][m] != 4) {
        var gr = new Grass(n, m, 1);
        grassArr.push(gr);
    }
    if (grEaterArr.length <= 3 && matrix[n][m] != 4) {
        var grEater = new GrassEater(n, m, 2);
        grEaterArr.push(grEater);
    }
    if (predatorArr.length <= 2 && matrix[n][m] != 4) {
        var predator = new Predator(n, m, 3);
        predatorArr.push(predator);
    }
    if (WormArr.length < 2 && matrix[n][m] != 4) {
        var worm = new Worm(n, m, 6);
        WormArr.push(worm);
    }


    if (HoleArr.length == 0) {
        var hole = new Hole(n, m, 1);
        HoleArr.push(hole);
    }
    if (predatorArr.length >= 10) {
        predatorArr.length == 3;
    }

    if (DestArr.length == 0) {
        var n = random(1, 10)
        n = parseInt(n);
        if (n == 1) {
            var destroyer = new Destroyer(n, m, 5);
            DestArr.push(destroyer);
        }
    }

    if (!music.isPlaying() && !NoSounds) {
        music.setVolume(0.1 * MSCvolume);
        music.play();
    }
    if (NoSounds) {
        music.stop();
    }

}