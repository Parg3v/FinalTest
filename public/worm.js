class Worm extends LivingCreature{
    constructor(x, y, index){
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
        var EmptyCells = random(this.chooseCell(0));
        var grCells = random(this.chooseCell(1));
        if (grCells) {
            var newX = grCells[0];
            var newY = grCells[1];
            matrix[newY][newX] = 6;
            matrix[this.y][this.x] = 1;
            this.x = newX;
            this.y = newY;
        }else if(EmptyCells){
            matrix[EmptyCells[1]][EmptyCells[0]] = 1;
        }

    }
}