function BallCollisionMotor(gameArea) {
    this.gameArea = gameArea;
}


BallCollisionMotor.prototype.getCollisions = function () {
    var collisions = new BallCollisions();

    addCollisionsWithGameArea(collisions, this.gameArea.ball, this.gameArea);
    addCollisionsWithBar(collisions, this.gameArea.ball, this.gameArea.bar);
    addCollisionsWithBricks(collisions, this.gameArea.ball, this.gameArea.wall.bricks);

    return collisions;


    function addCollisionsWithGameArea(collisions, ball, gameArea) {
        if (ball.coordinates.x >= gameArea.width - Ball.RADIUS) {
            collisions.hitRightCollision();
        }
        if (ball.coordinates.x <= Ball.RADIUS) {
            collisions.hitLeftCollision();
        }
        if (ball.coordinates.y >= gameArea.height - Ball.RADIUS) {
            collisions.hitBottomCollision();
        }
        if (ball.coordinates.y <= Ball.RADIUS) {
            collisions.hitTopCollision();
        }
    }

    function addCollisionsWithBar(collisions, ball, bar) {
        if (ball.getRightBoundCoordinateX() >= bar.getLeftBoundCoordinateX() && ball.getLeftBoundCoordinateX() <= bar.getRightBoundCoordinateX() && ball.getBottomBoundCoordinateY() >= bar.getTopBoundCoordinateY()) {
            collisions.hitBottomCollision();
        }
    }

    function addCollisionsWithBricks(collisions, ball, bricks) {

        var ballIndexY = Math.floor(ball.coordinates.y / (Brick.HEIGHT + Wall.SPACE_BETWEEN_BRICKS));
        var ballIndexX = Math.floor(ball.coordinates.x / (Brick.WIDTH + Wall.SPACE_BETWEEN_BRICKS));

        var topBrick = getBrick(ballIndexY - 1, ballIndexX, bricks);
        if (topBrick != undefined && topBrick.broken == false) {
            if (ball.getTopBoundCoordinateY() <= topBrick.getBottomBoundCoordinateY()) {
                topBrick.broken = true;
                collisions.hitTopCollision();
            }
        }

        var rightBrick = getBrick(ballIndexY, ballIndexX + 1, bricks);
        if (rightBrick != undefined && rightBrick.broken == false) {
            if (ball.getRightBoundCoordinateX() >= rightBrick.getLeftBoundCoordinateX()) {
                rightBrick.broken = true;
                collisions.hitRightCollision();
            }
        }

        var bottomBrick = getBrick(ballIndexY + 1, ballIndexX, bricks);
        if (bottomBrick != undefined && bottomBrick.broken == false) {
            if (ball.getBottomBoundCoordinateY() >= bottomBrick.getTopBoundCoordinateY()) {
                bottomBrick.broken = true;
                collisions.hitBottomCollision();
            }
        }

        var leftBrick = getBrick(ballIndexY, ballIndexX - 1, bricks);
        if (leftBrick != undefined && leftBrick.broken == false) {
            if (ball.getLeftBoundCoordinateX() <= leftBrick.getRightBoundCoordinateX()) {
                leftBrick.broken = true;
                collisions.hitLeftCollision();
            }
        }

        var rightBottomBrick = getBrick(ballIndexY + 1, ballIndexX + 1, bricks);
        if (rightBottomBrick != undefined && rightBottomBrick.broken == false) {
            if (ball.getRightBoundCoordinateX() <= rightBottomBrick.getLeftBoundCoordinateX()
                && ball.getBottomBoundCoordinateY() >= rightBottomBrick.getTopBoundCoordinateY()) {
                rightBottomBrick.broken = true;
                collisions.hitRightCollision();
                collisions.hitBottomCollision();
            }
        }

        var leftBottomBrick = getBrick(ballIndexY + 1, ballIndexX - 1, bricks);
        if (leftBottomBrick != undefined && leftBottomBrick.broken == false) {
            if (ball.getLeftBoundCoordinateX() >= leftBottomBrick.getRightBoundCoordinateX()
                && ball.getBottomBoundCoordinateY() >= leftBottomBrick.getTopBoundCoordinateY()) {
                leftBottomBrick.broken = true;
                collisions.hitLeftCollision();
                collisions.hitBottomCollision();
            }
        }

        var rightTopBrick = getBrick(ballIndexY - 1, ballIndexX + 1, bricks);
        if (rightTopBrick != undefined && rightTopBrick.broken == false) {
            if (ball.getRightBoundCoordinateX() >= rightTopBrick.getLeftBoundCoordinateX()
                && ball.getTopBoundCoordinateY() <= rightTopBrick.getBottomBoundCoordinateY()) {
                rightTopBrick.broken = true;
                collisions.hitRightCollision();
                collisions.hitTopCollision();
            }
        }

        var leftTopBrick = getBrick(ballIndexY - 1, ballIndexX - 1, bricks);
        if (leftTopBrick != undefined && leftTopBrick.broken == false) {
            if (ball.getLeftBoundCoordinateX() <= leftTopBrick.getRightBoundCoordinateX()
                && ball.getTopBoundCoordinateY() <= leftTopBrick.getBottomBoundCoordinateY()) {
                leftTopBrick.broken = true;
                collisions.hitLeftCollision();
                collisions.hitTopCollision();
            }
        }
    }

    function getBrick(ballIndexY, ballIndexX, bricks) {
        if (bricks[ballIndexY] != undefined) {
            return bricks[ballIndexY][ballIndexX];
        }
    }
}
