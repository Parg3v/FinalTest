var socket = io();
var side = 20;
var season;

//seasons (buttons)
function clickHandler(evt) {
    season = "winter";
}

var w = document.getElementById("winter");
w.addEventListener("click", clickHandler);


function clickHandler1(evt) {
    season = "spring";
}

var sp = document.getElementById("spring");
sp.addEventListener("click", clickHandler1);



function clickHandler2(evt) {
    season = "summer";
}

var su = document.getElementById("summer");
su.addEventListener("click", clickHandler2);


function clickHandler3(evt) {
    season = "autumn";
}

var au = document.getElementById("autumn");
au.addEventListener("click", clickHandler3);

var clrsGrass = ["#32a852", "#2e994b", "#288a42"];
var clrsGrassSnow = ["#edf1f2", "#b5ebff", "#b5d0ff"];
var clrsGrassAutumn = ["#e09d31", "#e67300", "#a38260"];
var clrsGrassSummer = ["#53c700", "#2da800", "#268f00"];


function setup() {
    frameRate(10);
    createCanvas(25 * side, 25 * side);
    background('#acacac');



}
socket.on("start", update);


function update(obj) {
    matrix = obj.m;
    boxArr = obj.box;
    DestArr = obj.dest;

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                if (season == "winter") {
                    fill(random(clrsGrassSnow));
                } else if (season == "autumn") {
                    fill(random(clrsGrassAutumn));
                }else if(season == "summer"){
                    fill(random(clrsGrassSummer));
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
            } else if (matrix[y][x] == 7) {
                fill("#595757");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            rect(x * side, y * side, side, side);
        }
    }
}