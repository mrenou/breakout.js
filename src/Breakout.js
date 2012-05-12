define("Breakout", ["GameArea"],function(GameArea) {
        console.log("Breakout loading...");
        function Breakout(canvas) {
            var RIGHT_KEY = 39;
            var LEFT_KEY = 37;

            var context = canvas.getContext('2d');
            var gameArea = new GameArea(canvas.width, canvas.height, context);
            gameArea.draw();

            var intervalId;

            window.document.onkeydown = checkInput;

            function checkInput(event) {
                if (!gameStarted()) {
                    startGame();
                }
                if (event.keyCode == RIGHT_KEY) {
                    gameArea.bar.moveRight();
                } else if (event.keyCode == LEFT_KEY) {
                    gameArea.bar.moveLeft();
                }
            }

            function oneStep() {
                gameArea.oneStep();
                if (gameArea.isWined()) {
                    alert("win");
                    endGame();
                }
                if (gameArea.isLose()) {
                    alert("loose");
                    endGame();
                }
            }

            function gameStarted() {
                return intervalId != undefined;
            }

            function startGame() {
                gameArea.ball.directionVector.x = 1;
                gameArea.ball.directionVector.y = -1;
                intervalId = setInterval(oneStep, 10);
            }

            function endGame() {
                clearInterval(intervalId);
                intervalId = undefined;
                gameArea.init();
            }

            return this;
        }
        return Breakout;
    }
);
