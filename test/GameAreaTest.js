TestCase("GameAreaTest", {
    "setUp":function () {
        JsHamcrest.Integration.JsTestDriver();
        JsMockito.Integration.JsTestDriver();
    },
    "test : game area should so one step":function () {
        // Given
        var contextMocked = TestUtils.getContextMocked();
        var gameArea = new GameArea(1000, 1000, contextMocked);
        gameArea.ball = spy(gameArea.ball);
        gameArea.bar = spy(gameArea.bar);
        gameArea.wall = spy(gameArea.wall);

        // When
        gameArea.oneStep();

        // Then
        verify(gameArea.ball).move();
        verify(gameArea.ball).draw();
        verify(gameArea.bar).draw();
        verify(gameArea.wall).draw();
        verify(contextMocked).clearRect(0, 0, 1000, 1000);
    },
    "test : game area should init":function () {
        // Given
        var contextMocked = TestUtils.getContextMocked();
        var gameArea = new GameArea(1000, 1000, contextMocked);
        gameArea.ball = spy(gameArea.ball);
        gameArea.bar = spy(gameArea.bar);
        gameArea.wall = spy(gameArea.wall);

        // When
        gameArea.init();

        // Then
        verify(gameArea.ball).init();
        verify(gameArea.bar).init();
        verify(gameArea.wall).init();
    },
    "test : game should be wined":function () {
        // Given
        var contextMocked = TestUtils.getContextMocked();
        var gameArea = new GameArea(1000, 1000, contextMocked);
        gameArea.ball = spy(gameArea.ball);
        gameArea.bar = spy(gameArea.bar);
        gameArea.wall = spy(gameArea.wall);

        when(gameArea.wall).isBroken().thenReturn(true);

        // When
        var isWined = gameArea.isWined();

        // Then
        assertEquals(true, isWined);
    },
    "test : game should not be wined":function () {
        // Given
        var contextMocked = TestUtils.getContextMocked();
        var gameArea = new GameArea(1000, 1000, contextMocked);
        gameArea.ball = spy(gameArea.ball);
        gameArea.bar = spy(gameArea.bar);
        gameArea.wall = spy(gameArea.wall);

        when(gameArea.wall).isBroken().thenReturn(false);

        // When
        var isWined = gameArea.isWined();

        // Then
        assertEquals(false, isWined);
    },
    "test : game should be lose":function () {
        // Given
        var contextMocked = TestUtils.getContextMocked();
        var gameArea = new GameArea(1000, 1000, contextMocked);
        gameArea.ball = spy(gameArea.ball);
        gameArea.bar = spy(gameArea.bar);
        gameArea.wall = spy(gameArea.wall);

        when(gameArea.ball).getBottomBoundCoordinateY().thenReturn(1000);

        // When
        var isLose = gameArea.isLose();

        // Then
        assertEquals(true, isLose);
    },
    "test : game should not be lose":function () {
        // Given
        var contextMocked = TestUtils.getContextMocked();
        var gameArea = new GameArea(1000, 1000, contextMocked);
        gameArea.ball = spy(gameArea.ball);
        gameArea.bar = spy(gameArea.bar);
        gameArea.wall = spy(gameArea.wall);

        when(gameArea.ball).getBottomBoundCoordinateY().thenReturn(999);

        // When
        var isLose = gameArea.isLose();

        // Then
        assertEquals(false, isLose);
    }
});
