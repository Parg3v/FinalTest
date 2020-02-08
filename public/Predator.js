var LivingCreature = require("./LivingCreature")

module.exports = class Predator extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index)
        this.energy = 8;
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

    mul() {
        this.getNewCoordinates()
        this.multiply++;
        var newCll = this.chooseCell(0);
        var newCell = newCll[Math.floor(Math.random() * newCll.length)];
        if (this.multiply >= 8 && newCell) {

            var newPredator = new Predator(newCell[0], newCell[1], this.index);
            predatorArr.push(newPredator);
            grEaterArr.slice(newPredator);
            matrix[newCell[1]][newCell[0]] = 3;
            this.multiply = 0;
        }
    }

    

    move() {
        this.getNewCoordinates()
        var newCll = this.chooseCell(0);
        var newCell = newCll[Math.floor(Math.random() * newCll.length)];
        var grcll = this.chooseCell(0);
        var grCells = grcll[Math.floor(Math.random() * grcll.length)];
        if (newCell) {
            this.energy--;
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
        } else if (grCells) {
            this.energy--;
            var newX = grCells[0];
            var newY = grCells[1];
            matrix[newY][newX] = 3;
            matrix[this.y][this.x] = 1;
            this.x = newX;
            this.y = newY;
        }

    }

    eat() {
        this.getNewCoordinates()
        var GrEaterCells = this.chooseCell(2);
        var newCell = GrEaterCells[Math.floor(Math.random() * GrEaterCells.length)];
        if (newCell) {

            // // sounds
            // if (!NoSounds) {
            //     pred.setVolume(0.5 * volume);
            //     pred.play();
            // }

            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;

            for (var i in grEaterArr) {
                if (newX == grEaterArr[i].x && newY == grEaterArr[i].y) {
                    grEaterArr.splice(i, 1);
                    break;
                }
            }
            this.mul()

        } else if (this.energy > 0) {
            this.move();

        } else {
            this.die();
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
                break;
            }
        }
    }
}