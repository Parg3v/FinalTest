// matrix



var music;
var socket = io();
var side = 20;

var snow = false;

var clrsGrass = ["#32a852", "#2e994b", "#288a42"]
var clrsGrassSnow = ["#edf1f2", "#b5ebff", "#b5d0ff"]


// Arrays

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
    createCanvas(25 * side, 25 * side);
    background('#acacac');



}
socket.on("start", update);


function update(obj) {
    matrix = obj.m
    boxArr = obj.box
    DestArr = obj.dest
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
            } else if (matrix[y][x] == 7) {
                fill("#000000");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            rect(x * side, y * side, side, side);
        }
    }
}