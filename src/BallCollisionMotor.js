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
        var nearestBricks = getNearestBricksFromBall(ball, bricks);

        for(var i=0; i < nearestBricks.length; i++) {
            if (nearestBricks[i] != undefined) {
                addCollisionsBetweenBallAndBrick(collisions, ball, nearestBricks[i]);
            }
        }
    }

    function getNearestBricksFromBall(ball, bricks) {
        var nearestBricks = new Array();
        var ballIndexY = Math.floor(ball.coordinates.y / (Brick.HEIGHT + Wall.SPACE_BETWEEN_BRICKS));
        var ballIndexX = Math.floor(ball.coordinates.x / (Brick.WIDTH + Wall.SPACE_BETWEEN_BRICKS));

        pushBrickIfExists(ballIndexY - 1, ballIndexX, bricks, nearestBricks);
        pushBrickIfExists(ballIndexY, ballIndexX + 1, bricks, nearestBricks);
        pushBrickIfExists(ballIndexY + 1, ballIndexX, bricks, nearestBricks);
        pushBrickIfExists(ballIndexY, ballIndexX - 1, bricks, nearestBricks);
        pushBrickIfExists(ballIndexY + 1, ballIndexX + 1, bricks, nearestBricks);
        pushBrickIfExists(ballIndexY + 1, ballIndexX - 1, bricks, nearestBricks);
        pushBrickIfExists(ballIndexY - 1, ballIndexX + 1, bricks, nearestBricks);
        pushBrickIfExists(ballIndexY - 1, ballIndexX - 1, bricks, nearestBricks);
        return nearestBricks;
    }

    function pushBrickIfExists(ballIndexY, ballIndexX, bricks, nearestBricks) {
        if (bricks[ballIndexY] != undefined && bricks[ballIndexY][ballIndexX] != undefined && !bricks[ballIndexY][ballIndexX].broken) {
            nearestBricks.push(bricks[ballIndexY][ballIndexX]);
        }
    }

    function addCollisionsBetweenBallAndBrick(collisions, ball, brick) {
        var nearestBrickPoint = getNearestBrickPoint(ball, brick);
        var nearestBrickPointFromBallCenter = useBallCenterAsLandmark(ball, nearestBrickPoint);

        if (isContainedInBall(nearestBrickPointFromBallCenter)) {
            if (nearestBrickPointFromBallCenter.x > 0) {
                brick.broken = true;
                collisions.hitLeftCollision();
            }
            if (nearestBrickPointFromBallCenter.x < 0) {
                brick.broken = true;
                collisions.hitRightCollision();
            }
            if (nearestBrickPointFromBallCenter.y > 0) {
                brick.broken = true;
                collisions.hitTopCollision();
            }
            if (nearestBrickPointFromBallCenter.y < 0) {
                brick.broken = true;
                collisions.hitBottomCollision();
            }
        }
    }

    function getNearestBrickPoint(ball, brick) {
        var nearestBrickPointX = Math.min(ball.coordinates.x, brick.getRightBoundCoordinateX());
        nearestBrickPointX = Math.max(nearestBrickPointX, brick.getLeftBoundCoordinateX());
        var nearestBrickPointY = Math.min(ball.coordinates.y, brick.getBottomBoundCoordinateY());
        nearestBrickPointY = Math.max(nearestBrickPointY, brick.getTopBoundCoordinateY());
        return new Coordinates(nearestBrickPointX, nearestBrickPointY);
    }

    function useBallCenterAsLandmark(ball, nearestBrickPoint) {
        return new Coordinates(ball.coordinates.x - nearestBrickPoint.x, ball.coordinates.y - nearestBrickPoint.y);
    }

    function isContainedInBall(nearestBrickPointFromBallCenter) {
        return Math.abs(nearestBrickPointFromBallCenter.x) <= Ball.RADIUS && Math.abs(nearestBrickPointFromBallCenter.y) <= Ball.RADIUS;
    }
}
