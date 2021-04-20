var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 200, "y": canvasHeight / 8 },
                { "type": "sawblade", "x": 400, "y": canvasHeight / 8  },
                { "type": "sawblade", "x": 600, "y": canvasHeight / 8  },
                { "type": "reward", "x": 5000, "y": 300 },
                { "type": "enemy", "x": 250, "y": 300 },
                { "type": "groo", "x": 1000, "y": groundY + 300 },
            ]
        };
        
        for (i = 0; i < levelData.gameItems.length; i++) {
            var firstGameItemObject = levelData.gameItems[i];
            var firstX = firstGameItemObject.x;
            var firstY = firstGameItemObject.y;
            var firstType = firstGameItemObject.type;
            
            if (firstType === "sawblade") {
                createSawBlade(firstX, firstY);
            } else if (firstType === "reward") {
                createReward(firstX, firstY);
            } else if (firstType === "enemy") {
                createEnemy(firstX, firstY);
            } else {
                createGroo(firstX, firstY);  
            }
        }
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        //Obstacle creation
        function createSawBlade (x, y) {
        var hitZoneSize = 25;
        var damageFromObstacle = 10;
        var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
        sawBladeHitZone.x = x;
        sawBladeHitZone.y = y;
        game.addGameItem(sawBladeHitZone);    
        var obstacleImage = draw.bitmap('img/sawblade.png');
        obstacleImage.x = -25;
        obstacleImage.y = -25;
        sawBladeHitZone.addChild(obstacleImage);
        }

        function createGroo (x, y) {
        var hitZoneSize = 25;
        var damageFromObstacle = 10;
        var grooHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
        grooHitZone.x = x;
        grooHitZone.y = y;
        game.addGameItem(grooHitZone);    
        var obstacleImage = draw.bitmap('img/groo2.png');
        obstacleImage.x = -25;
        obstacleImage.y = -25;
        grooHitZone.addChild(obstacleImage);
        }
        
        function createEnemy (x, y) {
        var enemy = game.createGameItem('enemy',25);
        var frown = draw.bitmap('img/enemy.png');
        frown.x = -25;
        frown.y = -25;
        enemy.addChild(frown);
        enemy.x = x;
        enemy.y = y;
        game.addGameItem(enemy);
        enemy.velocityX = -1;
        rotationVelocity = 10;

            enemy.onPlayerCollision = function() {
                game.changeIntegrity(-10);
            };
            enemy.onProjectileCollision = function() {
                enemy.fadeOut();
            game.increaseScore(100);
            }
        }

        function createReward (x, y) {
        var reward = game.createGameItem('reward',25);
        var smile = draw.bitmap('img/reward.png');
        smile.x = -25;
        smile.y = -25;
        reward.addChild(smile);
        reward.x = x;
        reward.y = y;
        game.addGameItem(reward);
        reward.velocityX = -0.75;
        rotationVelocity = 10;

            reward.onPlayerCollision = function() {
                game.changeIntegrity(100);
                game.increaseScore(100);
                reward.fadeOut();
            }
        }
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
