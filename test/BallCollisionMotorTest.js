TestCase("BallColliosionMotorTest", {
    "setUp":function () {
        JsHamcrest.Integration.JsTestDriver();
        JsMockito.Integration.JsTestDriver();
    },
    HEIGTH:1000,
    WIDTH:1000,
    "test : ball should have top collision":function () {
        // Given
        var gameArea = new GameArea(this.WIDTH, this.HEIGTH, {});
        gameArea.wall.bricks = new Array();
        gameArea.ball.coordinates.x = this.WIDTH / 2;
        gameArea.ball.coordinates.y = Ball.RADIUS;

        var collisionMotor = new BallCollisionMotor(gameArea);

        // When
        var collisions = collisionMotor.getCollisions();

        // Then
        assertEquals(1, collisions.numberOfCollisions());
        assertTrue(collisions.haveTopCollision());
    },
    "test : ball should not have top collision":function () {
        // Given
        var gameArea = new GameArea(this.WIDTH, this.HEIGTH, {});
        gameArea.wall.bricks = new Array();
        gameArea.ball.coordinates.x = this.WIDTH / 2;
        gameArea.ball.coordinates.y = Ball.RADIUS + 1;

        var collisionMotor = new BallCollisionMotor(gameArea);

        // When
        var collisions = collisionMotor.getCollisions();

        // Then
        assertTrue(collisions.haveNoneCollision());
    },
    "test : ball should have left collision":function () {
        // Given
        var gameArea = new GameArea(this.WIDTH, this.HEIGTH, {});
        gameArea.ball.coordinates.x = Ball.RADIUS;
        gameArea.ball.coordinates.y = 750;

        var collisionMotor = new BallCollisionMotor(gameArea);

        // When
        var collisions = collisionMotor.getCollisions();

        // Then
        assertEquals(1, collisions.numberOfCollisions());
        assertTrue(collisions.haveLeftCollision());
    },
    "test : ball should not have left collision":function () {
        // Given
        var gameArea = new GameArea(this.WIDTH, this.HEIGTH, {});
        gameArea.ball.coordinates.x = Ball.RADIUS + 1;
        gameArea.ball.coordinates.y = 750;

        var collisionMotor = new BallCollisionMotor(gameArea);

        // When
        var collisions = collisionMotor.getCollisions();

        // Then
        assertTrue(collisions.haveNoneCollision());
    },
    "test : ball should have bottom collision":function () {
        // Given
        var gameArea = new GameArea(this.WIDTH, this.HEIGTH, {});
        gameArea.ball.coordinates.x = this.WIDTH / 2;
        gameArea.ball.coordinates.y = this.HEIGTH - Ball.RADIUS;

        var collisionMotor = new BallCollisionMotor(gameArea);

        // When
        var collisions = collisionMotor.getCollisions();

        // Then
        assertEquals(1, collisions.numberOfCollisions());
        assertTrue(collisions.haveBottomCollision());
    },
    "test : ball should not have bottom collision":function () {
        // Given
        var gameArea = new GameArea(this.WIDTH, this.HEIGTH, {});
        gameArea.ball.coordinates.x = 10;
        gameArea.ball.coordinates.y = this.HEIGTH - Ball.RADIUS - 1;

        var collisionMotor = new BallCollisionMotor(gameArea);

        // When
        var collisions = collisionMotor.getCollisions();

        // Then
        assertTrue(collisions.haveNoneCollision());
    },
    "test : ball should have right collision":function () {
        // Given
        var gameArea = new GameArea(this.WIDTH, this.HEIGTH, {});
        gameArea.ball.coordinates.x = this.WIDTH - Ball.RADIUS;
        gameArea.ball.coordinates.y = 750;

        var collisionMotor = new BallCollisionMotor(gameArea);

        // When
        var collisions = collisionMotor.getCollisions();

        // Then
        assertEquals(1, collisions.numberOfCollisions());
        assertTrue(collisions.haveRightCollision());
    },
    "test : ball should not have right collision":function () {
        // Given
        var gameArea = new GameArea(this.WIDTH, this.HEIGTH, {});
        gameArea.ball.coordinates.x = this.WIDTH - Ball.RADIUS - 1;
        gameArea.ball.coordinates.y = 750;

        var collisionMotor = new BallCollisionMotor(gameArea);

        // When
        var collisions = collisionMotor.getCollisions();

        // Then
        assertTrue(collisions.haveNoneCollision());
    },
    "test : ball should have right bottom collision":function () {
        // Given
        var gameArea = new GameArea(this.WIDTH, this.HEIGTH, {});
        gameArea.ball.coordinates.x = this.WIDTH - Ball.RADIUS;
        gameArea.ball.coordinates.y = this.HEIGTH - Ball.RADIUS;

        var collisionMotor = new BallCollisionMotor(gameArea);

        // When
        var collisions = collisionMotor.getCollisions();

        // Then
        assertEquals(2, collisions.numberOfCollisions());
        assertTrue(collisions.haveRightCollision());
        assertTrue(collisions.haveBottomCollision());
    },
    "test : ball should have bottom collision with bar at left":function () {
        // Given
        var gameArea = new GameArea(this.WIDTH, this.HEIGTH, {});
        gameArea.ball.coordinates.x = (gameArea.width / 2) - (Bar.WIDTH / 2) - Ball.RADIUS;
        gameArea.ball.coordinates.y = gameArea.bar.coordinates.y - Ball.RADIUS;

        var collisionMotor = new BallCollisionMotor(gameArea);

        // When
        var collisions = collisionMotor.getCollisions();

        // Then
        assertEquals(1, collisions.numberOfCollisions());
        assertTrue(collisions.haveBottomCollision());
    },
    "test : ball should have bottom collision with bar at right":function () {
        // Given
        var gameArea = new GameArea(this.WIDTH, this.HEIGTH, {});
        gameArea.ball.coordinates.x = (gameArea.width / 2) + (Bar.WIDTH / 2) + Ball.RADIUS;
        gameArea.ball.coordinates.y = gameArea.bar.coordinates.y - Ball.RADIUS;

        var collisionMotor = new BallCollisionMotor(gameArea);

        // When
        var collisions = collisionMotor.getCollisions();

        // Then
        assertEquals(1, collisions.numberOfCollisions());
        assertTrue(collisions.haveBottomCollision());
    },
    "test : ball should not have bottom collision with bar at left":function () {
        // Given
        var gameArea = new GameArea(this.WIDTH, this.HEIGTH, {});
        gameArea.ball.coordinates.x = (gameArea.width / 2) - (Bar.WIDTH / 2) - Ball.RADIUS - 1;
        gameArea.ball.coordinates.y = gameArea.bar.coordinates.y - Ball.RADIUS;

        var collisionMotor = new BallCollisionMotor(gameArea);

        // When
        var collisions = collisionMotor.getCollisions();

        // Then
        assertTrue(collisions.haveNoneCollision());
    },
    "test : ball should not have bottom collision with bar at right":function () {
        // Given
        var gameArea = new GameArea(this.WIDTH, this.HEIGTH, {});
        gameArea.ball.coordinates.x = (gameArea.width / 2) + (Bar.WIDTH / 2) + Ball.RADIUS + 1;
        gameArea.ball.coordinates.y = gameArea.bar.coordinates.y - Ball.RADIUS;

        var collisionMotor = new BallCollisionMotor(gameArea);

        // When
        var collisions = collisionMotor.getCollisions();

        // Then
        assertTrue(collisions.haveNoneCollision());
    },
    "test : ball should have top collision with one brick":function () {
        // Given
        var gameArea = new GameArea(this.WIDTH, this.HEIGTH, {});

        //break all bricks expected one
        this.breakAllBricks(gameArea);
        gameArea.wall.bricks[2][3].broken = false;
        gameArea.wall.bricks[2][4].broken = false;
        gameArea.wall.bricks[2][5].broken = false;

        // ball under the brick
        gameArea.ball.coordinates.x = this.getRightBrickBoundX(4) - (Brick.WIDTH / 2);
        gameArea.ball.coordinates.y = this.getBottomBrickBoundY(2) + Ball.RADIUS;

        var collisionMotor = new BallCollisionMotor(gameArea);

        // When
        var collisions = collisionMotor.getCollisions();

        // Then
        assertEquals(1, collisions.numberOfCollisions());
        assertTrue(collisions.haveTopCollision());
        assertFalse(gameArea.wall.bricks[2][3].broken);
        assertTrue(gameArea.wall.bricks[2][4].broken);
        assertFalse(gameArea.wall.bricks[2][5].broken);
    },
    "test : ball should not have top collision with one brick":function () {
        // Given
        var gameArea = new GameArea(this.WIDTH, this.HEIGTH, {});

        //break all bricks expected one
        this.breakAllBricks(gameArea);
        gameArea.wall.bricks[2][4].broken = false;

        // ball under the brick
        gameArea.ball.coordinates.x = this.getRightBrickBoundX(4) - (Brick.WIDTH / 2);
        gameArea.ball.coordinates.y = this.getBottomBrickBoundY(2) + Ball.RADIUS + 1;

        var collisionMotor = new BallCollisionMotor(gameArea);

        // When
        var collisions = collisionMotor.getCollisions();

        // Then
        assertTrue(collisions.haveNoneCollision());
    },
    "test : ball should have right collision with one brick":function () {
        // Given
        var gameArea = new GameArea(this.WIDTH, this.HEIGTH, {});

        //break all bricks expected one
        this.breakAllBricks(gameArea);
        gameArea.wall.bricks[2][4].broken = false;

        // ball at left of the brick
        gameArea.ball.coordinates.x = this.getRightBrickBoundX(4) - Brick.WIDTH - Ball.RADIUS;
        gameArea.ball.coordinates.y = this.getBottomBrickBoundY(2) - (Brick.HEIGHT / 2);

        var collisionMotor = new BallCollisionMotor(gameArea);

        // When
        var collisions = collisionMotor.getCollisions();

        // Then
        assertEquals(1, collisions.numberOfCollisions());
        assertTrue(collisions.haveRightCollision());
        assertTrue(gameArea.wall.bricks[2][4].broken);
    },
    "test : ball should not have right collision with one brick":function () {
        // Given
        var gameArea = new GameArea(this.WIDTH, this.HEIGTH, {});

        //break all bricks expected one
        this.breakAllBricks(gameArea);
        gameArea.wall.bricks[2][4].broken = false;

        // ball at left of the brick
        gameArea.ball.coordinates.x = this.getRightBrickBoundX(4) - Brick.WIDTH - Ball.RADIUS - 1;
        gameArea.ball.coordinates.y = this.getBottomBrickBoundY(2) - (Brick.HEIGHT / 2);

        var collisionMotor = new BallCollisionMotor(gameArea);

        // When
        var collisions = collisionMotor.getCollisions();

        // Then
        assertTrue(collisions.haveNoneCollision());
    },
    "test : ball should have bottom collision with one brick":function () {
        // Given
        var gameArea = new GameArea(this.WIDTH, this.HEIGTH, {});

        //break all bricks expected one
        this.breakAllBricks(gameArea);
        gameArea.wall.bricks[2][4].broken = false;

        // ball top of the brick
        gameArea.ball.coordinates.x = this.getRightBrickBoundX(4) - (Brick.WIDTH / 2);
        gameArea.ball.coordinates.y = this.getBottomBrickBoundY(2) - Brick.HEIGHT - Ball.RADIUS;

        var collisionMotor = new BallCollisionMotor(gameArea);

        // When
        var collisions = collisionMotor.getCollisions();

        // Then
        assertEquals(1, collisions.numberOfCollisions());
        assertTrue(collisions.haveBottomCollision());
        assertTrue(gameArea.wall.bricks[2][4].broken);
    },
    "test : ball should not have bottom collision with one brick":function () {
        // Given
        var gameArea = new GameArea(this.WIDTH, this.HEIGTH, {});

        //break all bricks expected one
        this.breakAllBricks(gameArea);
        gameArea.wall.bricks[2][4].broken = false;

        // ball top of the brick
        gameArea.ball.coordinates.x = this.getRightBrickBoundX(4) - (Brick.WIDTH / 2);
        gameArea.ball.coordinates.y = this.getBottomBrickBoundY(2) - Brick.HEIGHT - Ball.RADIUS - 1;

        var collisionMotor = new BallCollisionMotor(gameArea);

        // When
        var collisions = collisionMotor.getCollisions();

        // Then
        assertTrue(collisions.haveNoneCollision());
    },
    "test : ball should have left collision with one brick":function () {
        // Given
        var gameArea = new GameArea(this.WIDTH, this.HEIGTH, {});

        //break all bricks expected one
        this.breakAllBricks(gameArea);
        gameArea.wall.bricks[2][4].broken = false;

        // ball at right of the brick
        gameArea.ball.coordinates.x = this.getRightBrickBoundX(4) + Ball.RADIUS;
        gameArea.ball.coordinates.y = this.getBottomBrickBoundY(2) - (Brick.HEIGHT / 2);

        var collisionMotor = new BallCollisionMotor(gameArea);

        // When
        var collisions = collisionMotor.getCollisions();

        // Then
        assertEquals(1, collisions.numberOfCollisions());
        assertTrue(collisions.haveLeftCollision());
        assertTrue(gameArea.wall.bricks[2][4].broken);
    },
    "test : ball should not have left collision with one brick":function () {
        // Given
        var gameArea = new GameArea(this.WIDTH, this.HEIGTH, {});

        //break all bricks expected one
        this.breakAllBricks(gameArea);
        gameArea.wall.bricks[2][4].broken = false;

        // ball at right of the brick
        gameArea.ball.coordinates.x = this.getRightBrickBoundX(4) + Ball.RADIUS + 1;
        gameArea.ball.coordinates.y = this.getBottomBrickBoundY(2) - (Brick.HEIGHT / 2);

        var collisionMotor = new BallCollisionMotor(gameArea);

        // When
        var collisions = collisionMotor.getCollisions();

        // Then
        assertTrue(collisions.haveNoneCollision());
    },
    "test : ball should have right and bottom collision with one brick":function () {
        // Given
        var gameArea = new GameArea(this.WIDTH, this.HEIGTH, {});

        //break all bricks expected one
        this.breakAllBricks(gameArea);
        gameArea.wall.bricks[2][4].broken = false;

        // ball at right of the brick
        gameArea.ball.coordinates.x = this.getRightBrickBoundX(4) - Brick.WIDTH - Ball.RADIUS;
        gameArea.ball.coordinates.y = this.getBottomBrickBoundY(2) - Brick.HEIGHT - Ball.RADIUS;

        var collisionMotor = new BallCollisionMotor(gameArea);

        // When
        var collisions = collisionMotor.getCollisions();

        // Then
        assertEquals(2, collisions.numberOfCollisions());
        assertTrue(collisions.haveRightCollision());
        assertTrue(collisions.haveBottomCollision());
        assertTrue(gameArea.wall.bricks[2][4].broken);
    },
    "test : ball should have left and bottom collision with one brick":function () {
        // Given
        var gameArea = new GameArea(this.WIDTH, this.HEIGTH, {});

        //break all bricks expected one
        this.breakAllBricks(gameArea);
        gameArea.wall.bricks[2][4].broken = false;

        // ball at right of the brick
        gameArea.ball.coordinates.x = this.getRightBrickBoundX(4) + Ball.RADIUS;
        gameArea.ball.coordinates.y = this.getBottomBrickBoundY(2) - Brick.HEIGHT - Ball.RADIUS;

        var collisionMotor = new BallCollisionMotor(gameArea);

        // When
        var collisions = collisionMotor.getCollisions();

        // Then
        assertEquals(2, collisions.numberOfCollisions());
        assertTrue(collisions.haveLeftCollision());
        assertTrue(collisions.haveBottomCollision());
        assertTrue(gameArea.wall.bricks[2][4].broken);
    },
    "test : ball should have right and top collision with one brick":function () {
        // Given
        var gameArea = new GameArea(this.WIDTH, this.HEIGTH, {});

        //break all bricks expected one
        this.breakAllBricks(gameArea);
        gameArea.wall.bricks[2][4].broken = false;

        // ball at right of the brick
        gameArea.ball.coordinates.x = this.getRightBrickBoundX(4) - Brick.WIDTH - Ball.RADIUS;
        gameArea.ball.coordinates.y = this.getBottomBrickBoundY(2) + Ball.RADIUS;

        var collisionMotor = new BallCollisionMotor(gameArea);

        // When
        var collisions = collisionMotor.getCollisions();

        // Then
        assertEquals(2, collisions.numberOfCollisions());
        assertTrue(collisions.haveRightCollision());
        assertTrue(collisions.haveTopCollision());
        assertTrue(gameArea.wall.bricks[2][4].broken);
    },
    "test : ball should have left and top collision with one brick":function () {
        // Given
        var gameArea = new GameArea(this.WIDTH, this.HEIGTH, {});

        //break all bricks expected one
        this.breakAllBricks(gameArea);
        gameArea.wall.bricks[2][4].broken = false;

        // ball at right of the brick
        gameArea.ball.coordinates.x = this.getRightBrickBoundX(4) + Ball.RADIUS;
        gameArea.ball.coordinates.y = this.getBottomBrickBoundY(2) + Ball.RADIUS;

        var collisionMotor = new BallCollisionMotor(gameArea);

        // When
        var collisions = collisionMotor.getCollisions();

        // Then
        assertEquals(2, collisions.numberOfCollisions());
        assertTrue(collisions.haveLeftCollision());
        assertTrue(collisions.haveTopCollision());
        assertTrue(gameArea.wall.bricks[2][4].broken);
    },
    breakAllBricks:function (gameArea) {
        for (var indexY = 0; indexY < gameArea.wall.nbLines; indexY++) {
            for (var indexX = 0; indexX < gameArea.wall.nbBricksInLine; indexX++) {
                gameArea.wall.bricks[indexY][indexX].broken = true;
            }
        }
    },
    getRightBrickBoundX:function (indexX) {
        return ((indexX + 1) * (Brick.WIDTH + Wall.SPACE_BETWEEN_BRICKS) - Wall.SPACE_BETWEEN_BRICKS);
    },
    getBottomBrickBoundY:function (indexY) {
        return ((indexY + 1) * (Brick.HEIGHT + Wall.SPACE_BETWEEN_BRICKS) - Wall.SPACE_BETWEEN_BRICKS);
    }
})
;
