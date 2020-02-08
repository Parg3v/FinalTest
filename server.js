var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require("fs");

// Classes
var GrassEater = require('./public/GrassEater');
var Grass = require("./public/Grass");
var Predator = require("./public/Predator");
var Box = require("./public/Box");
var Destroyer = require("./public/Destroyer");
var Worm = require("./public/worm");
var Mouse = require("./public/mouse");

// Arrays
predatorArr = [];
grassArr = [];
grEaterArr = [];
boxArr = [];
DestArr = [];
WormArr = [];
mouseArr = [];


// Matrix
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

app.use(express.static("public"));

app.get('/', function (req, res) {
    res.redirect('index.html');
});

server.listen(3000, "localhost", function () {
    console.log("Started");

});

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
            var mouse = new Mouse(x, y, 7);
            mouseArr.push(mouse);
        }
    }
}


// func --> script.js(draw-i poxaren)
function main() {


    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grEaterArr) {
        grEaterArr[i].eat();
    }
    for (var i in predatorArr) {
        predatorArr[i].eat();
    }
    for (var i in mouseArr) {
        mouseArr[i].eat();
    }
    for (var i in WormArr) {
        WormArr[i].move();
    }
    for (var i in boxArr) {
        boxArr[i].Generate();
    }
    for (var i in DestArr) {
        DestArr[i].starting();
    }

    var n = Math.floor(Math.random() * (25 - 0) + 0);

    var m = Math.floor(Math.random() * (25 - 0) + 0);

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
    if (mouseArr.length < 1 && matrix[n][m] != 4) {
        var mouse = new Mouse(n, m, 7);
        mouseArr.push(mouse);
    }
    if (predatorArr.length >= 10) {
        predatorArr.length == 3;
    }

    if (DestArr.length == 0) {
        var n = Math.floor(Math.random() * (10 - 1) + 1);
        if (n == 1) {
            var destroyer = new Destroyer(n, m, 5);
            DestArr.push(destroyer);
        }
    }

    fs.writeFileSync("./data/data1.json", JSON.stringify(grassArr));
    fs.writeFileSync("./data/data2.json", JSON.stringify(grEaterArr));
    fs.writeFileSync("./data/data3.json", JSON.stringify(predatorArr));
    fs.writeFileSync("./data/data4.json", JSON.stringify(boxArr));
    fs.writeFileSync("./data/data5.json", JSON.stringify(DestArr));
    fs.writeFileSync("./data/data6.json", JSON.stringify(WormArr));
    fs.writeFileSync("./data/data7.json", JSON.stringify(mouseArr));

    io.sockets.emit("start", obj);
}

// uxarkac popoxakanner
var obj = {
    m: matrix,
    box: boxArr,
    dest: DestArr
}
// FPS
setInterval(main, 1000);



