define("GameArea", ["Bar", "Ball", "Wall"],function(Bar, Ball, Wall) {
        console.log("GameArea loading...");
        function GameArea(width, height, context) {
            this.width = width;
            this.height = height;
            this.context = context;

            this.bar = new Bar(this);
            this.ball = new Ball(this);
            this.wall = new Wall(this);

            return this;
        }

        GameArea.prototype.init = function () {
            this.wall.init();
            this.bar.init();
            this.ball.init();
            this.oneStep();
        }

        GameArea.prototype.oneStep = function () {
            var that = this;
            this.ball.move();
            clear();
            this.draw();

            function clear() {
                that.context.clearRect(0, 0, that.width, that.height);
            }
        }

        GameArea.prototype.draw = function () {
            this.wall.draw();
            this.bar.draw();
            this.ball.draw();
        }

        GameArea.prototype.isWined = function () {
            return this.wall.isBroken();
        }

        GameArea.prototype.isLose = function () {
            return this.ball.getBottomBoundCoordinateY() == this.height;
        }
        return GameArea;
    }
);
