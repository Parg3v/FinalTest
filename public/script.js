var socket = io();
var side = 20;

var clrsGrass = ["#32a852", "#2e994b", "#288a42"];
var clrsGrassSnow = ["#edf1f2", "#b5ebff", "#b5d0ff"];
var clrsGrassAutumn = ["#e09d31", "#e67300", "#a38260"];
var clrsGrassSummer = ["#53c700", "#2da800", "#268f00"];
var clrsGrassInfected = ["#260022", "#870079", "#9e2c92"];


function setup() {
    frameRate(10);
    createCanvas(25 * side, 25 * side);
    background('#acacac');

}
socket.on("start", update);

var cl = false;

function mousePressed() {
    if(mouseX < 500 && mouseX > 0 && mouseY < 500 && mouseY > 0){
        cl = !cl;
        console.log("clicked");
        
    }
}


function update(obj) {


    matrix = obj.m;
    boxArr = obj.box;
    DestArr = obj.dest;
    season = obj.seas;

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1 && !cl) {
                if (season == "winter") {
                    fill(random(clrsGrassSnow));
                } else if (season == "autumn") {
                    fill(random(clrsGrassAutumn));
                } else if (season == "summer") {
                    fill(random(clrsGrassSummer));
                } else {
                    fill(random(clrsGrass));
                }
            }
            else if (matrix[y][x] == 2 && !cl) {
                fill("yellow");
            } else if (matrix[y][x] == 3) {
                fill("red");
            } else if (matrix[y][x] == 4) {
                fill(boxArr[0].color);
            } else if (matrix[y][x] == 5) {
                fill(DestArr[0].color);
            } else if (matrix[y][x] == 6 && !cl) {
                fill("#a13e00");
            } else if (matrix[y][x] == 7 && !cl) {
                fill("#595757");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            
            
            else if(matrix[y][x] == 1 && cl){
                fill(random(clrsGrassInfected))
            }else if (matrix[y][x] == 2 && cl) {
                fill("#acacac");
            } else if (matrix[y][x] == 6 && cl) {
                fill("#acacac");
            } else if (matrix[y][x] == 7 && cl) {
                fill("#acacac");
            }
            rect(x * side, y * side, side, side);
        }
    }
}