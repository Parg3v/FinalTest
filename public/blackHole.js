class Hole extends LivingCreature {
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
        var Cells = this.chooseCell(1, 6);
        var newCell = random(Cells);
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
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