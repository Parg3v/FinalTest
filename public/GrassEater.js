var LivingCreature = require("./LivingCreature")


module.exports = class GrassEater extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index)
        this.energy = 8;
    }

    

    mul() {
        this.getNewCoordinates()
        this.multiply++;
        var newCll = this.chooseCell(0);
        var newCell = newCll[Math.floor(Math.random() * newCll.length)];
        if (this.multiply >= 8 && newCell) {

            var newGrassEater = new GrassEater(newCell[0], newCell[1], this.index);
            grEaterArr.push(newGrassEater);
            grassArr.slice(newGrassEater);
            matrix[newCell[1]][newCell[0]] = 2;
            this.multiply = 0;
        }
    }

   
 

    move() {
        this.getNewCoordinates()
        var emptyCells = this.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        if (newCell) {
            this.energy--;
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
        }

    }

    eat() {
        this.getNewCoordinates()
        var GrCells = this.chooseCell(1);
        var newCell = GrCells[Math.floor(Math.random() * GrCells.length)];        
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;

            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
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
        for (var i in grEaterArr) {
            if (this.x == grEaterArr[i].x && this.y == grEaterArr[i].y) {
                grEaterArr.splice(i, 1);
                break;
            }
        }
    }
}