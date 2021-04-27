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
                
                /*{ "type": "sawblade", "x": 1200, "y": groundY - 110}, 
                { "type": "sawblade", "x": 2400, "y": groundY - 120},
                { "type": "sawblade", "x": 3600, "y": groundY - 120},
                { "type": "sawblade", "x": 4800, "y": groundY - 120},
                { "type": "sawblade", "x": 6000, "y": groundY - 120},
                { "type": "sawblade", "x": 7200, "y": groundY - 120},
                { "type": "sawblade", "x": 8400, "y": groundY - 120},

                { "type": "robot", "x": 1300, "y": groundY - 70},
                { "type": "witch", "x": 3000, "y": groundY - 170},
                { "type": "witch", "x": 4500, "y": groundY - 170},
                { "type": "robot", "x": 7500, "y": groundY - 160},

                { "type": "frank", "x": 1400, "y": groundY - 170},
                { "type": "robot", "x": 3400, "y": groundY - 160},
                { "type": "frank", "x": 5400, "y": groundY - 170},
                { "type": "frank", "x": 7400, "y": groundY - 170},
                { "type": "frank", "x": 9400, "y": groundY - 170},

                { "type": "reward", "x": 1000, "y": groundY - 90},
                { "type": "reward2", "x": 3000, "y": groundY - 85},
                { "type": "reward3", "x": 5000, "y": groundY - 135},
                { "type": "reward4", "x": 7000, "y": groundY - 120},
                { "type": "reward", "x": 9000, "y": groundY - 90},

                { "type": "enemy", "x": 800, "y": groundY - 30},
                { "type": "enemy", "x": 1700, "y": groundY - 30},
                { "type": "robot", "x": 2600, "y": groundY - 160},
                { "type": "enemy", "x": 3500, "y": groundY - 30},
                { "type": "enemy", "x": 4400, "y": groundY - 30},
                { "type": "enemy", "x": 5300, "y": groundY - 30},
                { "type": "robot", "x": 6200, "y": groundY - 160},
                { "type": "enemy", "x": 7150, "y": groundY - 30}, */
            ] 
        };
        createSawBlade(500, groundY - 110);

        for (i = 0; i < levelData.gameItems.length; i++) {
            var obj = levelData.gameItems[i];
            var objX = obj.x;
            var objY = obj.y;
            var objType = obj.type;
            
            if (objType === "sawblade") {
                createSawBlade(objX, objY);
            } else if (objType === "witch") {
                createWitch(objX, objY);
            } else if (objType === "frank") {
                createFrank(objX, objY);
            } else if (objType === "robot") {
                createRobot(objX, objY);
            } else if (objType === "reward") {
                createReward(objX, objY);
            } else if (objType === "reward2") {
                createReward2(objX, objY);
            } else if (objType === "reward3") {
                createReward3(objX, objY);
            } else if (objType === "reward4") {
                createReward4(objX, objY);
            } else {
                createEnemy(objX, objY);
            } 
        }
        
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        //Obstacle creation
        function createSawBlade (x, y) {
            var hitZoneSize = 20;
            var damageFromObstacle = 10;
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            sawBladeHitZone.x = x;
            sawBladeHitZone.y = y;
            sawBladeHitZone.scaleX = -0.3;
            sawBladeHitZone.scaleY = 0.3; 
            game.addGameItem(sawBladeHitZone);    
            var obstacleImage = draw.bitmap('img/sawblade.png');
            obstacleImage.x = -400;
            obstacleImage.y = -50;
            sawBladeHitZone.addChild(obstacleImage);
            
            sawBladeHitZone.onPlayerCollision = function() {
                game.changeIntegrity(-20);
            };
        }

        function createEnemy (x,y) {
             var enemy =  game.createGameItem('enemy',30);               
             var gangster = draw.bitmap('img/enemy.png');
                gangster.x = -100;
                gangster.y = -120;
                gangster.scaleX = 0.4;
                gangster.scaleY = 0.4;  
                        
                enemy.addChild(gangster);
            
                enemy.x = x;
                enemy.y = y;
                enemy.velocityX = -1.5;
                    
                game.addGameItem(enemy);
                
                enemy.onPlayerCollision = function() {
                    game.changeIntegrity(-10);
                    enemy.fadeOut();
                };
                
                enemy.onProjectileCollision = function() {
                    game.increaseScore(50);
                    enemy.fadeOut();
                };
            }
    
        function createRobot (x, y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var robotHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            robotHitZone.x = x;
            robotHitZone.y = y;
            robotHitZone.scaleX = 0.4;
            robotHitZone.scaleY = 0.4;
            game.addGameItem(robotHitZone);    
            var obstacleImage = draw.bitmap('img/robot.png');
            obstacleImage.x = -25;
            obstacleImage.y = -25;
            robotHitZone.addChild(obstacleImage);

            robotHitZone.onPlayerCollision = function() {
                game.changeIntegrity(-10);
            };
            robotHitZone.onProjectileCollision = function() {
                robotHitZone.fadeOut();
            }
        }

        function createWitch (x, y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var witchHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            witchHitZone.x = x;
            witchHitZone.y = y;
            witchHitZone.scaleX = 0.25;
            witchHitZone.scaleY = 0.25;
            game.addGameItem(witchHitZone);    
            var obstacleImage = draw.bitmap('img/witch.png');
            obstacleImage.x = -24;
            obstacleImage.y = -32;
            witchHitZone.addChild(obstacleImage);

            witchHitZone.onPlayerCollision = function() {
                game.changeIntegrity(-10);
            };
            witchHitZone.onProjectileCollision = function() {
                witchHitZone.fadeOut();
            }
        }

        function createFrank (x, y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var frankHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            frankHitZone.x = x;
            frankHitZone.y = y;
            frankHitZone.scaleX = 0.15;
            frankHitZone.scaleY = 0.15;
            game.addGameItem(frankHitZone);    
            var obstacleImage = draw.bitmap('img/frank.png');
            obstacleImage.x = -30;
            obstacleImage.y = -25;
            frankHitZone.addChild(obstacleImage);

            frankHitZone.onPlayerCollision = function() {
                game.changeIntegrity(-10);
            };
            frankHitZone.onProjectileCollision = function() {
                frankHitZone.fadeOut();
            }
        }
        function createReward (x, y) {
            var reward = game.createGameItem('reward',25);
            var smile = draw.bitmap('img/reward.png');
            smile.x = -25;
            smile.y = -25;
            smile.scaleX = 0.3;
            smile.scaleY = 0.3;
            reward.addChild(smile);
            reward.x = x;
            reward.y = y;
            game.addGameItem(reward);
            reward.velocityX = -1.5;
            rotationVelocity = 10;

            reward.onPlayerCollision = function() {
                game.changeIntegrity(100);
                game.increaseScore(1);
                reward.fadeOut();
            }
        }

        function createReward2 (x, y) {
            var reward2 = game.createGameItem('reward2',25);
            var smile2 = draw.bitmap('img/reward2.png');
            smile2.x = -25;
            smile2.y = -25;
            smile2.scaleX = 0.3;
            smile2.scaleY = 0.3;
            reward2.addChild(smile2);
            reward2.x = x;
            reward2.y = y;
            game.addGameItem(reward2);
            reward2.velocityX = -0.75;
            rotationVelocity = 10;

            reward2.onPlayerCollision = function() {
                game.changeIntegrity(100);
                game.increaseScore(1);
                reward2.fadeOut();
            }
        }

        function createReward3 (x, y) {
            var reward3 = game.createGameItem('reward3',25);
            var smile3 = draw.bitmap('img/reward3.png');
            smile3.x = -25;
            smile3.y = -25;
            smile3.scaleX = 0.2;
            smile3.scaleY = 0.2;
            reward3.addChild(smile3);
            reward3.x = x;
            reward3.y = y;
            game.addGameItem(reward3);
            reward3.velocityX = -0.75;
            rotationVelocity = 10;

            reward3.onPlayerCollision = function() {
                game.changeIntegrity(100);
                game.increaseScore(1);
                reward3.fadeOut();
            }
        }

        function createReward4 (x, y) {
            var reward4 = game.createGameItem('reward4',25);
            var smile4 = draw.bitmap('img/reward4.png');
            smile4.x = -25;
            smile4.y = -25;
            smile4.scaleX = 0.3;
            smile4.scaleY = 0.3;
            reward4.addChild(smile4);
            reward4.x = x;
            reward4.y = y;
            game.addGameItem(reward4);
            reward4.velocityX = -0.75;
            rotationVelocity = 10;

            reward4.onPlayerCollision = function() {
                game.changeIntegrity(100);
                game.increaseScore(1);
                reward4.fadeOut();
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