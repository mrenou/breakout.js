function Ball(gameArea) {
    this.gameArea = gameArea;
    this.ballCollisionMotor = new BallCollisionMotor(gameArea);
    this.init(gameArea);
}

Ball.SPEED = 1;
Ball.RADIUS = 8;
Ball.COLOR = "#16A6DB";

Ball.prototype.move = function () {
    var that = this;

    updateDirectionWithCollisions();
    this.coordinates.x += Ball.SPEED * this.directionVector.x;
    this.coordinates.y += Ball.SPEED * this.directionVector.y;

    function updateDirectionWithCollisions() {
        var collisions = that.ballCollisionMotor.getCollisions();
        if (collisions.rightCollision) {
            that.directionVector.x = -1;
        }
        if (collisions.leftCollision) {
            that.directionVector.x = 1;
        }
        if (collisions.topCollision) {
            that.directionVector.y = 1;
        }
        if (collisions.bottomCollision) {
            that.directionVector.y = -1;
        }
    }
}

Ball.prototype.getLeftBoundCoordinateX = function () {
    return this.coordinates.x - Ball.RADIUS;
}

Ball.prototype.getRightBoundCoordinateX = function () {
    return this.coordinates.x + Ball.RADIUS;
}

Ball.prototype.getTopBoundCoordinateY = function () {
    return this.coordinates.y - Ball.RADIUS;
}

Ball.prototype.getBottomBoundCoordinateY = function () {
    return this.coordinates.y + Ball.RADIUS;
}

Ball.prototype.draw = function () {
    var context = this.gameArea.context;
    context.fillStyle = Ball.COLOR;
    context.beginPath();
    context.arc(this.coordinates.x, this.coordinates.y, Ball.RADIUS, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
}

Ball.prototype.init = function () {
    this.coordinates = new Coordinates(this.gameArea.width / 2, this.gameArea.bar.coordinates.y - Ball.RADIUS);
    this.directionVector = new ForceVector(0, 0);
}