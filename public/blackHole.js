var LivingCreature = require("./LivingCreature") 

module.exports = class Hole extends LivingCreature {
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

    eat() {
        this.getNewCoordinates()
        var Cells = this.chooseCell(0);
        var cl1 = this.chooseCell(1);
        for (var i = 1; i <= 6; i++) {
            if (!cl1) {
                var cl1 = this.chooseCell(i);
            }else{
                var cl = cl1[Math.floor(Math.random() * cl1.length)];
            }
        }
        var newCell = Cells[Math.floor(Math.random() * Cells.length)];
        if (!newCell && cl) {
            var newX = cl[0];
            var newY = cl[1];
            matrix[newY][newX] = 0;

            for (var i in grEaterArr) {
                if (newX == grEaterArr[i].x && newY == grEaterArr[i].y) {
                    grEaterArr.splice(i, 1);
                    break;
                }
            }
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            for (var i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }
            for (var i in WormArr) {
                if (newX == WormArr[i].x && newY == WormArr[i].y) {
                    WormArr.splice(i, 1);
                    break;
                }
            }
            for (var i in DestArr) {
                if (newX == DestArr[i].x && newY == DestArr[i].y) {
                    DestArr.splice(i, 1);
                    break;
                }
            }
            for (var i in boxArr) {
                if (newX == boxArr[i].x && newY == boxArr[i].y) {
                    boxArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}