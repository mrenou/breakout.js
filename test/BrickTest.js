RequireJSTestCase("BrickTest", ["Brick", "GameArea", "Wall"],
    {
        "setUp":function () {
            JsHamcrest.Integration.JsTestDriver();
            JsMockito.Integration.JsTestDriver();
            this.gameArea = new this.r.GameArea(1000, 1000, {});
        },
        "test : brick should have coordinates when just created":function () {
            // When
            var brick = new this.r.Brick(this.gameArea, 1, 2);

            // Then
            assertEquals(1, brick.indexX);
            assertEquals(2, brick.indexY);
        },
        "test : brick should not be broken when just created":function () {
            // When
            var brick = new this.r.Brick(this.gameArea, 1, 2);

            // Then
            assertFalse(brick.broken);
        },
        "test : brick should have a color when just created":function () {
            // When
            var brick = new this.r.Brick(this.gameArea, 1, 2);

            // Then
            assertTrue(brick.color != undefined);
        },
        "test : brick should return left bound coordinate x":function () {
            // Given
            var brick = new this.r.Brick(this.gameArea, 1, 2);

            // When
            var leftBoundCoordinateX = brick.getLeftBoundCoordinateX();

            // Then
            assertEquals(1 * (this.r.Brick.WIDTH + this.r.Wall.SPACE_BETWEEN_BRICKS), leftBoundCoordinateX);
        },
        "test : bar should return right bound coordinate x":function () {
            // Given
            var brick = new this.r.Brick(this.gameArea, 1, 2);

            // When
            var rightBoundCoordinateX = brick.getRightBoundCoordinateX();

            // Then
            assertEquals(1 * (this.r.Brick.WIDTH + this.r.Wall.SPACE_BETWEEN_BRICKS) + this.r.Brick.WIDTH, rightBoundCoordinateX);
        },
        "test : bar should return top bound coordinate y":function () {
            // Given
            var brick = new this.r.Brick(this.gameArea, 1, 2);

            // When
            var topBoundCoordinateY = brick.getTopBoundCoordinateY();

            // Then
            assertEquals(2 * (this.r.Brick.HEIGHT + this.r.Wall.SPACE_BETWEEN_BRICKS), topBoundCoordinateY);
        },
        "test : bar should return bottom bound coordinate y":function () {
            // Given
            var brick = new this.r.Brick(this.gameArea, 1, 2);

            // When
            var bottomBoundCoordinateY = brick.getBottomBoundCoordinateY();

            // Then
            assertEquals(2 * (this.r.Brick.HEIGHT + this.r.Wall.SPACE_BETWEEN_BRICKS) + this.r.Brick.HEIGHT, bottomBoundCoordinateY);
        },
        "test : brick should draw a rectangle":function () {
            // Given
            var contextMocked = TestUtils.getContextMocked();
            var brick = new this.r.Brick(this.gameArea, 1, 2);
            this.gameArea.context = contextMocked;

            // When
            brick.draw();

            // Then
            assertEquals(brick.color, contextMocked.fillStyle);
            verify(contextMocked).fillRect(50, 34, 48, 15);
        }
    }
);
