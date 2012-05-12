define("Brick", ["require", "Coordinates"],function(require, Coordinates) {
        console.log("Brick loading...");
        function Brick(gameArea, indexX, indexY) {
            this.gameArea = gameArea;
            this.color = "rgb("+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+")";
            this.indexX = indexX;
            this.indexY = indexY;
            this.coordinates = new Coordinates();
            this.coordinates.x = (this.indexX * (Brick.WIDTH + require("Wall").SPACE_BETWEEN_BRICKS));
            this.coordinates.y = (this.indexY * (Brick.HEIGHT + require("Wall").SPACE_BETWEEN_BRICKS));
            this.broken = false;
            return this;
        }

        Brick.WIDTH = 48;
        Brick.HEIGHT = 15;

        Brick.prototype.getLeftBoundCoordinateX = function () {
            return this.coordinates.x;
        }

        Brick.prototype.getRightBoundCoordinateX = function () {
            return this.coordinates.x + Brick.WIDTH;
        }

        Brick.prototype.getTopBoundCoordinateY = function () {
            return this.coordinates.y;
        }

        Brick.prototype.getBottomBoundCoordinateY = function () {
            return this.coordinates.y + Brick.HEIGHT;
        }

        Brick.prototype.draw = function() {
            var context = this.gameArea.context;
            context.fillStyle = this.color;
            context.fillRect(this.coordinates.x,this.coordinates.y, Brick.WIDTH, Brick.HEIGHT);
        }

        return Brick;
    }
);

