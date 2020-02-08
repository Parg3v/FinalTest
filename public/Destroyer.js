var LivingCreature = require("./LivingCreature")

module.exports = class Destroyer extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 8;
        this.color = "#0051ff";
        this.time = 0;
        this.id = Math.floor(Math.random() * (3 - 1) + 1);
        // var a = arr[Math.floor(Math.random() * arr.length)];


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

    starting() {
        this.time++;
        if (this.time < 10) {
            this.color = "#0051ff";
        } else if (this.time == 10) {
            this.color = "#0095ff"
        } else if (this.time == 20) {

            // //sounds
            // if (!NoSounds) {
            //     destSounds.setVolume(20 * volume);
            //     destSounds.play();
            // }


            this.color = "#00aeff";
        } else if (this.time >= 30) {
            this.eat();
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
            matrix[newY][newX] = 5;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
        }

    }

    eat() {
        this.getNewCoordinates()
        var GrCells = this.chooseCell(this.id);

        if (this.id == 1) {
            var newCell = GrCells[Math.floor(Math.random() * GrCells.length)];
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX] = 5;
                matrix[this.y][this.x] = 0;
                this.x = newX;
                this.y = newY;

                for (var i in grassArr) {
                    if (newX == grassArr[i].x && newY == grassArr[i].y) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }
            } else if (this.energy > 0) {
                this.move();
            } else {
                this.die();
            }
        } else if (this.id == 2) {
            var GrEaterCells = this.chooseCell(2);
            var newCell = GrEaterCells[Math.floor(Math.random() * GrEaterCells.length)];
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX] = 5;
                matrix[this.y][this.x] = 0;
                this.x = newX;
                this.y = newY;

                for (var i in grEaterArr) {
                    if (newX == grEaterArr[i].x && newY == grEaterArr[i].y) {
                        grEaterArr.splice(i, 1);
                        break;
                    }
                }

            } else if (this.energy > 0) {
                this.move();

            } else {
                this.die();
            }
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in DestArr) {
            if (this.x == DestArr[i].x && this.y == DestArr[i].y) {
                DestArr.splice(i, 1);
                break;
            }
        }
    }
}