TestCase("WallTest", {
    gameArea: new GameArea(1000, 1000, TestUtils().getContextMocked()),
    "setUp":function () {
        JsHamcrest.Integration.JsTestDriver();
        JsMockito.Integration.JsTestDriver();
    },
    "test : wall should be initiated with bricks":function () {
        // When
        var wall = new Wall(this.gameArea);

        // Then
        assertEquals(29, wall.nbLines);
        assertEquals(20, wall.nbBricksInLine);
        assertEquals(29, wall.bricks.length);
        assertEquals(20, wall.bricks[0].length);
        assertInstanceOf(Brick, wall.bricks[1][2]);
    },
    "test : wall should draw bricks":function () {
        // Given
        var wall = this.gameArea.wall;

        for (var indexY = 0; indexY < wall.nbLines; indexY++) {
            for (var indexX = 0; indexX < wall.nbBricksInLine; indexX++) {
                wall.bricks[indexY][indexX] = spy(wall.bricks[indexY][indexX]);
            }
        }
        wall.bricks[1][1].broken = false;
        wall.bricks[2][3].broken = false;

        // When
        wall.draw();

        // Then
        verify(wall.bricks[1][0], 0).draw();
        verify(wall.bricks[1][1]).draw();
        verify(wall.bricks[1][3]).draw();
        verify(wall.bricks[1][2], 0).draw();

    },
    "test : wall should init":function () {
        // Given
        var wall = this.gameArea.wall;

        for (var coordinateY = 0; coordinateY < wall.nbLines; coordinateY++) {
            for (var coordinateX = 0; coordinateX < wall.nbBricksInLine; coordinateX++) {
                wall.bricks[coordinateY][coordinateX].broken = true;
            }
        }

        // When
        wall.init();

        // Then
        for (var coordinateY = 0; coordinateY < wall.nbLines; coordinateY++) {
            for (var coordinateX = 0; coordinateX < wall.nbBricksInLine; coordinateX++) {
                assertFalse(wall.bricks[coordinateY][coordinateX].broken);
            }
        }
    },
    "test : wall should be broken":function () {
        // Given
        var wall = this.gameArea.wall;

        for (var coordinateY = 0; coordinateY < wall.nbLines; coordinateY++) {
            for (var coordinateX = 0; coordinateX < wall.nbBricksInLine; coordinateX++) {
                wall.bricks[coordinateY][coordinateX].broken = true;
            }
        }

        // When
        var broken = wall.isBroken();

        // Then
        assertEquals(true, broken);
    },
    "test : wall should not be broken":function () {
        // Given
        var wall = this.gameArea.wall;

        for (var coordinateY = 0; coordinateY < wall.nbLines; coordinateY++) {
            for (var coordinateX = 0; coordinateX < wall.nbBricksInLine; coordinateX++) {
                wall.bricks[coordinateY][coordinateX].broken = true;
            }
        }
        wall.bricks[1][1].broken = false;

        // When
        var broken = wall.isBroken();

        // Then
        assertEquals(true, broken);
    }
});
