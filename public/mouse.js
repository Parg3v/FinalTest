var LivingCreature = require("./LivingCreature");

module.exports = class Mouse extends LivingCreature{
    constructor(x, y, index){
        super(x, y, index);
        this.energy = 20;
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

    move() {
        this.getNewCoordinates()
        var newCll = this.chooseCell(0);
        var newCell = newCll[Math.floor(Math.random() * newCll.length)];
        var grcll = this.chooseCell(1);
        var grCells = grcll[Math.floor(Math.random() * grcll.length)];
        if (newCell) {
            this.energy--;
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 7;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
        } else if (grCells) {
            this.energy--;
            var newX = grCells[0];
            var newY = grCells[1];
            matrix[newY][newX] = 7;
            matrix[this.y][this.x] = 1;
            this.x = newX;
            this.y = newY;
        }

    }

    eat() {
        this.getNewCoordinates()
        var WormCells = this.chooseCell(6);
        var newCell = WormCells[Math.floor(Math.random() * WormCells.length)];
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 6;
            matrix[this.y][this.x] = 1;
            this.x = newX;
            this.y = newY;

            for (var i in WormArr) {
                if (newX == WormArr[i].x && newY == WormArr[i].y) {
                    WormArr.splice(i, 1);
                    break;
                }
            }

        } else if (this.energy > 0) {
            this.move();

        } else {
            this.die();
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in mouseArr) {
            if (this.x == mouseArr[i].x && this.y == mouseArr[i].y) {
                mouseArr.splice(i, 1);
                break;
            }
        }
    }
}