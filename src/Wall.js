define("Wall", ["Brick"],function(Brick) {
        console.log("Wall loading");
        function Wall(gameArea) {
            this.gameArea = gameArea;
            this.nbLines = Math.floor((gameArea.height / 2) / (Brick.HEIGHT + Wall.SPACE_BETWEEN_BRICKS));
            this.nbBricksInLine = Math.floor(gameArea.width / (Brick.WIDTH + Wall.SPACE_BETWEEN_BRICKS));
            this.bricks = new Array();
            for (var indexY = 0; indexY < this.nbLines; indexY++) {
                this.bricks[indexY] = new Array();
                for (var indexX = 0; indexX < this.nbBricksInLine; indexX++) {
                    this.bricks[indexY][indexX] = new Brick(gameArea, indexX, indexY);
                }
            }
            return this;
        }

        Wall.SPACE_BETWEEN_BRICKS = 2;

        Wall.prototype.draw = function () {
            for (var indexY = 0; indexY < this.nbLines; indexY++) {
                for (var indexX = 0; indexX < this.nbBricksInLine; indexX++) {
                    if (this.bricks[indexY][indexX].broken == false) {
                        this.bricks[indexY][indexX].draw();
                    }
                }
            }
        }

        Wall.prototype.init = function () {
            for (var indexY = 0; indexY < this.nbLines; indexY++) {
                for (var indexX = 0; indexX < this.nbBricksInLine; indexX++) {
                    this.bricks[indexY][indexX].broken = false;
                }
            }
        }

        Wall.prototype.isBroken = function () {
            for (var indexY = 0; indexY < this.nbLines; indexY++) {
                for (var indexX = 0; indexX < this.nbBricksInLine; indexX++) {
                    if (!this.bricks[indexY][indexX].broken) {
                        return false;
                    }
                }
            }
            return true;
        }

        return Wall;
    }
);