RequireJSTestCase("BarTest", ["Bar", "GameArea"],
    {
        COORDINATE_X:460,
        COORDINATE_Y:990,
        setUp:function () {
            JsHamcrest.Integration.JsTestDriver();
            JsMockito.Integration.JsTestDriver();
            this.gameArea = new this.r.GameArea(1000, 1000, {});
        },
        "test : bar should return left bound coordinate x":function () {
            // Given
            var bar = new this.r.Bar(this.gameArea);

            // When
            var leftBoundCoordinateX = bar.getLeftBoundCoordinateX();

            // Then
            assertEquals(this.COORDINATE_X, leftBoundCoordinateX);
        },
        "test : bar should return right bound coordinate x":function () {
            // Given
            var bar = new this.r.Bar(this.gameArea);

            // When
            var rightBoundCoordinateX = bar.getRightBoundCoordinateX();

            // Then
            assertEquals(this.COORDINATE_X + this.r.Bar.WIDTH, rightBoundCoordinateX);
        },
        "test : bar should return top bound coordinate y":function () {
            // Given
            var bar = new this.r.Bar(this.gameArea);

            // When
            var topBoundCoordinateY = bar.getTopBoundCoordinateY();

            // Then
            assertEquals(this.COORDINATE_Y, topBoundCoordinateY);
        },
        "test : bar should return bottom bound coordinate y":function () {
            // Given
            var bar = new this.r.Bar(this.gameArea);

            // When
            var bottomBoundCoordinateY = bar.getBottomBoundCoordinateY();

            // Then
            assertEquals(this.COORDINATE_Y + this.r.Bar.HEIGHT, bottomBoundCoordinateY);
        },
        "test : bar should have coordinates at middle when just created":function () {
            // When
            var bar = new this.r.Bar(this.gameArea);

            // Then
            assertEquals(this.COORDINATE_X, bar.coordinates.x);
            assertEquals(this.COORDINATE_Y, bar.coordinates.y);
        },
        "test : bar should move to right":function () {
            // Given
            var bar = new this.r.Bar(this.gameArea);

            // When
            bar.moveRight();

            // Then
            assertEquals(this.COORDINATE_X + this.r.Bar.SPEED, bar.coordinates.x);
            assertEquals(this.COORDINATE_Y, bar.coordinates.y);
        },
        "test : bar should not move to right when is at right bound":function () {
            // Given
            var bar = new this.r.Bar(this.gameArea);
            bar.coordinates.x = this.gameArea.width - this.r.Bar.WIDTH;
            bar.coordinates.Y = this.COORDINATE_Y;

            // When
            bar.moveRight();

            // Then
            assertEquals(this.gameArea.width - this.r.Bar.WIDTH, bar.coordinates.x);
            assertEquals(this.COORDINATE_Y, bar.coordinates.y);
        },
        "test : bar should not move to left when is at left bound":function () {
            // Given
            var bar = new this.r.Bar(this.gameArea);
            bar.coordinates.x = 0;
            bar.coordinates.Y = this.COORDINATE_Y;

            // When
            bar.moveLeft();

            // Then
            assertEquals(0, bar.coordinates.x);
            assertEquals(this.COORDINATE_Y, bar.coordinates.y);
        },
        "test : bar should move to left":function () {
            // Given
            var bar = new this.r.Bar(this.gameArea);

            // When
            bar.moveLeft();

            // Then
            assertEquals(this.COORDINATE_X - this.r.Bar.SPEED, bar.coordinates.x);
            assertEquals(this.COORDINATE_Y, bar.coordinates.y);
        },
        "test : bar should draw":function () {
            // Given
            var bar = new this.r.Bar(this.gameArea);
            var contextMocked = TestUtils.getContextMocked();
            this.gameArea.context = contextMocked;

            // When
            bar.draw();

            // Then
            assertEquals(this.r.Bar.COLOR, contextMocked.fillStyle);
            verify(contextMocked).fillRect(this.COORDINATE_X, this.COORDINATE_Y, this.r.Bar.WIDTH, this.r.Bar.HEIGHT);
        },
        "test : bar should init":function () {
            // Given
            var bar = new this.r.Bar(this.gameArea);

            // When
            bar.init();

            // Then                                                         ,
            assertEquals((this.gameArea.width / 2) - (this.r.Bar.WIDTH / 2), bar.coordinates.x);
            assertEquals(this.gameArea.height - this.r.Bar.HEIGHT, bar.coordinates.y);
        }
    }
);