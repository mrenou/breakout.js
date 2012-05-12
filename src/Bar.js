define("Bar", ["Coordinates"],function(Coordinates) {
        console.log("Bar loading...");
        function Bar(gameArea) {
            this.gameArea = gameArea;
            this.init();
            return this;
        }

        Bar.WIDTH = 80;
        Bar.HEIGHT = 10;
        Bar.SPEED = 8;
        Bar.COLOR = "#333333";

        Bar.prototype.getLeftBoundCoordinateX = function () {
            return this.coordinates.x;
        }

        Bar.prototype.getRightBoundCoordinateX = function () {
            return this.coordinates.x + Bar.WIDTH;
        }

        Bar.prototype.getTopBoundCoordinateY = function () {
            return this.coordinates.y;
        }

        Bar.prototype.getBottomBoundCoordinateY = function () {
            return this.coordinates.y + Bar.HEIGHT;
        }

        Bar.prototype.moveLeft = function () {
            if (this.getLeftBoundCoordinateX() > 0) {
                this.coordinates.x -= Bar.SPEED;
            }
        }


        Bar.prototype.moveRight = function () {
            if (this.getRightBoundCoordinateX() < this.gameArea.width) {
                this.coordinates.x += Bar.SPEED;
            }
        }

        Bar.prototype.draw = function () {
            var context = this.gameArea.context;
            context.fillStyle = Bar.COLOR;
            context.fillRect(this.coordinates.x, this.coordinates.y, Bar.WIDTH, Bar.HEIGHT);
        }

        Bar.prototype.init = function () {
            this.coordinates = new Coordinates((this.gameArea.width / 2) - (Bar.WIDTH / 2), this.gameArea.height - Bar.HEIGHT);
        }

        return Bar;
    }
);