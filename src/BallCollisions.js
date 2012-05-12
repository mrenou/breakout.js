define("BallCollisions", function() {
        console.log("BallCollisions loading...");
        function BallCollisions() {
            this.topCollision = false;
            this.rightCollision = false;
            this.bottomCollision = false;
            this.leftCollision = false;
            return this;
        }

        BallCollisions.prototype.hitTopCollision = function() {
            this.topCollision = true;
        }

        BallCollisions.prototype.haveTopCollision = function() {
            return this.topCollision;
        }

        BallCollisions.prototype.hitRightCollision = function() {
            this.rightCollision = true;
        }

        BallCollisions.prototype.haveRightCollision = function() {
            return this.rightCollision;
        }

        BallCollisions.prototype.hitBottomCollision = function() {
            this.bottomCollision = true;
        }

        BallCollisions.prototype.haveBottomCollision = function() {
            return this.bottomCollision;
        }

        BallCollisions.prototype.hitLeftCollision = function() {
            this.leftCollision = true;
        }

        BallCollisions.prototype.haveLeftCollision = function() {
            return this.leftCollision;
        }

        BallCollisions.prototype.haveNoneCollision = function() {
            return (this.topCollision == false && this.rightCollision == false && this.bottomCollision == false && this.leftCollision == false);
        }

        BallCollisions.prototype.numberOfCollisions = function() {
            var numberOfCollisions = 0;
            if (this.topCollision == true) {
                numberOfCollisions++;
            }
            if (this.rightCollision == true) {
                numberOfCollisions++;
            }
            if (this.bottomCollision == true) {
                numberOfCollisions++;
            }
            if (this.leftCollision == true) {
                numberOfCollisions++;
            }
            return numberOfCollisions;
        }

        return BallCollisions;
    }
);
