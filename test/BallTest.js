RequireJSTestCase("BallTest", ["Ball", "GameArea", "BallCollisions", "BallCollisionMotor"],
    {
        COORDINATE_X:500,
        COORDINATE_Y:750,
        setUp:function () {
            JsHamcrest.Integration.JsTestDriver();
            JsMockito.Integration.JsTestDriver();
        },
        "test : ball should return left bound coordinate x":function () {
            // Given
            var ball = this.getBall();

            // When
            var leftBoundCoordinateX = ball.getLeftBoundCoordinateX();

            // Then
            assertEquals(this.COORDINATE_X - this.r.Ball.RADIUS, leftBoundCoordinateX);
        },
        "test : ball should return right bound coordinate x":function () {
            // Given
            var ball = this.getBall();

            // When
            var rightBoundCoordinateX = ball.getRightBoundCoordinateX();

            // Then
            assertEquals(this.COORDINATE_X + this.r.Ball.RADIUS, rightBoundCoordinateX);
        },
        "test : ball should return top bound coordinate y":function () {
            // Given
            var ball = this.getBall();

            // When
            var topBoundCoordinateY = ball.getTopBoundCoordinateY();

            // Then
            assertEquals(this.COORDINATE_Y - this.r.Ball.RADIUS, topBoundCoordinateY);
        },
        "test : ball should return bottom bound coordinate y":function () {
            // Given
            var ball = this.getBall();

            // When
            var bottomBoundCoordinateY = ball.getBottomBoundCoordinateY();

            // Then
            assertEquals(this.COORDINATE_Y + this.r.Ball.RADIUS, bottomBoundCoordinateY);
        },
        "test : ball should move diagonal up right":function () {
            // Given
            var ball = this.getBall();
            ball.directionVector.x = 1;
            ball.directionVector.y = -1;

            // When
            ball.move();

            // Then
            assertEquals(this.COORDINATE_X + this.r.Ball.SPEED, ball.coordinates.x);
            assertEquals(this.COORDINATE_Y - this.r.Ball.SPEED, ball.coordinates.y);
        },
        "test : ball should move diagonal up left":function () {
            // Given
            var ball = this.getBall();
            ball.directionVector.x = -1;
            ball.directionVector.y = -1;

            // When
            ball.move();

            // Then
            assertEquals(this.COORDINATE_X - this.r.Ball.SPEED, ball.coordinates.x);
            assertEquals(this.COORDINATE_Y - this.r.Ball.SPEED, ball.coordinates.y);
        },
        "test : ball should move diagonal down right":function () {
            // Given
            var ball = this.getBall();
            ball.directionVector.x = 1;
            ball.directionVector.y = 1;

            // When
            ball.move();

            // Then
            assertEquals(this.COORDINATE_X + this.r.Ball.SPEED, ball.coordinates.x);
            assertEquals(this.COORDINATE_Y + this.r.Ball.SPEED, ball.coordinates.y);
        },
        "test : ball should move diagonal down left":function () {
            // Given
            var ball = this.getBall();
            ball.directionVector.x = -1;
            ball.directionVector.y = 1;

            // When
            ball.move();

            // Then
            assertEquals(this.COORDINATE_X - this.r.Ball.SPEED, ball.coordinates.x);
            assertEquals(this.COORDINATE_Y + this.r.Ball.SPEED, ball.coordinates.y);
        },
        "test : ball should not move":function () {
            // Given
            var ball = this.getBall();

            // When         n
            ball.move();

            // Then
            assertEquals(this.COORDINATE_X, ball.coordinates.x);
            assertEquals(this.COORDINATE_Y, ball.coordinates.y);
        },
        "test : ball should move diagonal up left when right collision from diagonal up right":function () {
            // Given
            var ball = this.getBall();
            ball.directionVector.x = 1;
            ball.directionVector.y = -1;
            var collisions = new this.r.BallCollisions();
            collisions.hitRightCollision();

            this.mockCollision(ball, collisions);

            // When
            ball.move();

            // Then
            assertEquals(-1, ball.directionVector.x);
            assertEquals(-1, ball.directionVector.y);
        },
        "test : ball should move diagonal down left when right collision from diagonal down right":function () {
            // Given
            var ball = this.getBall();
            ball.directionVector.x = 1;
            ball.directionVector.y = 1;
            var collisions = new this.r.BallCollisions();
            collisions.hitRightCollision();

            this.mockCollision(ball, collisions);

            // When
            ball.move();

            // Then
            assertEquals(-1, ball.directionVector.x);
            assertEquals(1, ball.directionVector.y);
        },
        "test : ball should move diagonal up right when left collision from diagonal up left":function () {
            // Given
            var ball = this.getBall();
            ball.directionVector.x = -1;
            ball.directionVector.y = -1;
            var collisions = new this.r.BallCollisions();
            collisions.hitLeftCollision();

            this.mockCollision(ball, collisions);

            // When
            ball.move();

            // Then
            assertEquals(1, ball.directionVector.x);
            assertEquals(-1, ball.directionVector.y);
        },
        "test : ball should move diagonal down right when left collision from diagonal down left":function () {
            // Given
            var ball = this.getBall();
            ball.directionVector.x = -1;
            ball.directionVector.y = 1;
            var collisions = new this.r.BallCollisions();
            collisions.hitLeftCollision();

            this.mockCollision(ball, collisions);

            // When
            ball.move();

            // Then
            assertEquals(1, ball.directionVector.x);
            assertEquals(1, ball.directionVector.y);
        },
        "test : ball should move diagonal down left when top collision from diagonal up left":function () {
            // Given
            var ball = this.getBall();
            ball.directionVector.x = -1;
            ball.directionVector.y = -1;
            var collisions = new this.r.BallCollisions();
            collisions.hitTopCollision();

            this.mockCollision(ball, collisions);

            // When
            ball.move();

            // Then
            assertEquals(-1, ball.directionVector.x);
            assertEquals(1, ball.directionVector.y);
        },
        "test : ball should move diagonal down right when top collision from diagonal up right":function () {
            // Given
            var ball = this.getBall();
            ball.directionVector.x = 1;
            ball.directionVector.y = -1;
            var collisions = new this.r.BallCollisions();
            collisions.hitTopCollision();

            this.mockCollision(ball, collisions);

            // When
            ball.move();

            // Then
            assertEquals(1, ball.directionVector.x);
            assertEquals(1, ball.directionVector.y);
        },
        "test : ball should move diagonal up left when bottom collision from diagonal down left":function () {
            // Given
            var ball = this.getBall();
            ball.directionVector.x = -1;
            ball.directionVector.y = 1;
            var collisions = new this.r.BallCollisions();
            collisions.hitBottomCollision();

            this.mockCollision(ball, collisions);

            // When
            ball.move();

            // Then
            assertEquals(-1, ball.directionVector.x);
            assertEquals(-1, ball.directionVector.y);
        },
        "test : ball should move diagonal up right when bottom collision from diagonal down right":function () {
            // Given
            var ball = this.getBall();
            ball.directionVector.x = 1;
            ball.directionVector.y = 1;
            var collisions = new this.r.BallCollisions();
            collisions.hitBottomCollision();

            this.mockCollision(ball, collisions);

            // When
            ball.move();

            // Then
            assertEquals(1, ball.directionVector.x);
            assertEquals(-1, ball.directionVector.y);
        },
        "test : ball should move diagonal up right":function () {
            // Given
            var ball = this.getBall();
            ball.directionVector.x = 1;
            ball.directionVector.y = -1;

            // When
            ball.move();

            // Then
            assertEquals(this.COORDINATE_X + this.r.Ball.SPEED, ball.coordinates.x);
            assertEquals(this.COORDINATE_Y - this.r.Ball.SPEED, ball.coordinates.y);
        },
        "test : ball should move diagonal up left when right collision from diagonal up left":function () {
            // Given
            var ball = this.getBall();
            ball.directionVector.x = -1;
            ball.directionVector.y = -1;
            var collisions = new this.r.BallCollisions();
            collisions.hitRightCollision();

            this.mockCollision(ball, collisions);

            // When
            ball.move();

            // Then
            assertEquals(-1, ball.directionVector.x);
            assertEquals(-1, ball.directionVector.y);
        },
        "test : ball should init":function () {
            // Given
            var ball = this.getBall();

            // When
            ball.init();

            // Then
            assertEquals(0, ball.directionVector.x);
            assertEquals(0, ball.directionVector.y);
            assertEquals(ball.gameArea.width / 2, ball.coordinates.x);
            assertEquals(ball.gameArea.bar.coordinates.y - this.r.Ball.RADIUS, ball.coordinates.y);
        },
        getBall:function () {
            var gameArea = new this.r.GameArea(1000, 1000, {});
            gameArea.ball.coordinates.x = this.COORDINATE_X;
            gameArea.ball.coordinates.y = this.COORDINATE_Y;
            return gameArea.ball;
        },
        mockCollision:function (ball, collisions) {
            ball.ballCollisionMotor = mock(this.r.BallCollisionMotor);
            when(ball.ballCollisionMotor).getCollisions().thenReturn(collisions);
        }
    }
);