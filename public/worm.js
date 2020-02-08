var LivingCreature = require("./LivingCreature");
var Grass = require("./Grass");

module.exports = class Worm extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);

    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }

    move() {
        this.getNewCoordinates()
        var newCll = this.chooseCell(0);
        var EmptyCells = newCll[Math.floor(Math.random() * newCll.length)];
        var grCell = this.chooseCell(1);
        var grCells = grCell[Math.floor(Math.random() * grCell.length)];
        if (grCells) {
            var newX = grCells[0];
            var newY = grCells[1];
            matrix[newY][newX] = 6;
            matrix[this.y][this.x] = 1;
            this.x = newX;
            this.y = newY;
        } else if (EmptyCells) {
            var newGrass = new Grass(EmptyCells[0], EmptyCells[1], 1);
            grassArr.push(newGrass);
            matrix[EmptyCells[1]][EmptyCells[0]] = 1;

        }

    }
}