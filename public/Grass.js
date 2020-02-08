var LivingCreature = require("./LivingCreature")

module.exports = class Grass extends LivingCreature {
    mul() {
        this.multiply++;
        var newCll = this.chooseCell(0);
        var newCell = newCll[Math.floor(Math.random() * newCll.length)];
        if (this.multiply >= 8 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }

}