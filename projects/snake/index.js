/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  let grid = document.querySelector(".grid");
  let popup = document.querySelector(".popup");

  // Constant Variables
  var FRAME_RATE = 10;
  var FRAMES_PER_SECOND_INTERVAL = 100;
  $("#playAgain").hide();

  //determines if you can go in a specific direction
  var canLeft = false;
  var canRight = true;
  var canUp = false;
  var canDown = true;

  //keycode object
  var KEY = {
    "ENTER": 13,
    "LEFT": 37,
    "RIGHT": 39,
    "UP": 38,
    "DOWN": 40,
    "SPACE": 32,
    
    "A": 65,
    "W": 87,
    "S": 83,
    "D": 68,
    
  };

  // Game Item Objects
  function Factory (id, x, y, speedX, speedY) {
    var instance = {};
    
      instance.id = id;
      instance.x = x;
      instance.y = y;
      instance.width = $(id).width();
      instance.height = $(id).height();
      instance.speedX = speedX;
      instance.speedY = speedY;
      
      return instance;
    }

  //Factory objects declaration
  var snakeHead = Factory("#snake", 0, 0, 0, 0);
  var apple = Factory("#apple", (Math.floor(Math.random() * 20)) * 40, (Math.floor(Math.random() * 20)) * 40, 0, 0);
  
  //score ticker
  var score = 0;
  var prevScore = 0;

  //snake div
  var snakeBody = [snakeHead]; 
  
  //div widths
  var boardWidth = $('#board').width();	
  var boardHeight = $('#board').height();
  var snakeWidth = $('#snake').width();	
  var snakeHeight = $('#snake').height();

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionAndRedrawGameItem();
    checkBoundaries();
    eatApple(); 
    snakeCheck();
    appleCheck();  
    repositionSnake();
    drawScore(); 
    selfCheck();
  }
  
  //keyboard events
  function handleKeyDown(event) {
    if (event.which === KEY.LEFT || event.which === KEY.A){
      if (snakeHead.speedX == 0 && canLeft) {
  	  snakeHead.speedX = -20;
      snakeHead.speedY = 0;
      }
  	}
  	if (event.which === KEY.RIGHT || event.which === KEY.D){
      if (snakeHead.speedX == 0 && canRight) {
  	  snakeHead.speedX = +20;
      snakeHead.speedY = 0;
      }
	  }
    if (event.which === KEY.UP || event.which === KEY.W){
      if (snakeHead.speedY == 0 && canUp) {
      snakeHead.speedY = -20;
      snakeHead.speedX = 0;
      }
    }
    if (event.which === KEY.DOWN || event.which === KEY.S){
      if (snakeHead.speedY == 0 && canDown) {
      snakeHead.speedY = +20;
      snakeHead.speedX = 0;
      }
	  }
  }

  //boundary check for snake
  function checkBoundaries(){
    if (snakeHead.x > boardWidth - snakeWidth){ 
      reset(); 
		}
		if (snakeHead.x < 0){ 
      reset(); 
		}
		if (snakeHead.y > boardHeight - snakeHeight){ 
      reset();
		}
		if (snakeHead.y < 0){ 
      reset();
		}
  }

  //detects apple collision
  function eatApple () {
    if (snakeHead.x == apple.x && snakeHead.y == apple.y) {
      bodyIncrease(); 
      respawnApple(); 
      score++ 
      console.log(score);
    }
  }   

  //handles snake body motion
  function repositionSnake(){
    for (var i = snakeBody.length - 1; i >= 1; i--){
       snakeBody[i].x = snakeBody[i - 1].x;
       snakeBody[i].y = snakeBody[i - 1].y;
       drawObject(snakeBody[i]);
    }
    
  }

  //checks snake collision with body
  function snakeCheck () {
    if (collideCheck(snakeHead) == true) {
      reset(); 
    }
  }

  //checks snake collision with apple
  function appleCheck () {
    if (collideCheck(apple) == true) {
      respawnApple(); 
    }
  }
  
  //permenantly borrowed from https://christinescheller.github.io/ASD/snake/index.html
  //prevents doubling back, QoL
  function selfCheck() {
    snakeHead.x > snakeHead.prevX ? canLeft = false : canLeft = true;
    snakeHead.x < snakeHead.prevX ? canRight = false : canRight = true;
    snakeHead.y > snakeHead.prevY ? canUp = false : canUp = true;
    snakeHead.y < snakeHead.prevY ? canDown = false : canDown = true;
  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function repositionAndRedrawGameItem() {
    snakeHead.x += snakeHead.speedX;
    snakeHead.y += snakeHead.speedY;
    $("#snake").css("left", snakeHead.x);
    $("#snake").css("top", snakeHead.y);
    
    $("#apple").css("left", apple.x);
    $("#apple").css("top", apple.y);
  }
  
  //increases snake body
  function bodyIncrease () {
    var newID = "snake" + snakeBody.length;

      $("<div>")
          .addClass("snake")
          .attr('id', newID)
          .appendTo("#board")
      
      var tail = snakeBody[snakeBody.length - 1];    
      var newBodyPiece = Factory("#" + newID, tail.x + 2, tail.y, 0, 0);
      
      drawObject(newBodyPiece);    
      snakeBody.push(newBodyPiece);
  }

  //object draw helper
  function drawObject(object) {
    $(object.id).css("left", object.x);
    $(object.id).css("top", object.y);
  }

  //draws score
  function drawScore() {
    $('#score').text("Score: " + score);
  }

  //respawns apple in random position
  function respawnApple () {
    $("#apple").hide();
    apple.x = (Math.floor(Math.random() * 20)) * 40;
    apple.y = (Math.floor(Math.random() * 20)) * 40; 
    $("#apple").show();
  }

  //resets snake pos, vel, and score on death
  function reset () {
    $("#snakeHead").hide();
    $("#playAgain").show();
    endGame();
    $(".snake").remove();
    snakeBody.length = 1;
    $("#playAgain").on("click", runProgram);

    
  }

  //helper check for collision
  function collideCheck(object){
    for (var i = 1; i < snakeBody.length; i++) {
      if (object.x == snakeBody[i].x && object.y == snakeBody[i].y){
        return true; 
      }      
    }
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
