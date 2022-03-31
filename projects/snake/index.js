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

  var KEY = {
    "ENTER": 13,
    "LEFT": 37,
    "RIGHT": 39,
    "UP": 38,
    "DOWN": 40,
    "SPACE": 32,
    
    "A": 68,
    "W": 83,
    "S": 87,
    "D": 65,
    
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

  var snakeHead = Factory("#snake", 0, 0, 0, 0);
  
  var apple = Factory("#apple", (Math.floor(Math.random() * 20)) * 40, (Math.floor(Math.random() * 20)) * 40, 0, 0);
  
  var score = 0;
  var prevScore = 0;
  var snakeBody = [snakeHead]; 
  
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
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.LEFT || event.which === KEY.A){
  	  snakeHead.speedX = -20;
      snakeHead.speedY = 0;
  	}
  	if (event.which === KEY.RIGHT || event.which === KEY.D){
  	  snakeHead.speedX = +20;
      snakeHead.speedY = 0;
	  }
    if (event.which === KEY.UP || event.which === KEY.W){
      snakeHead.speedY = -20;
      snakeHead.speedX = 0;
    }
    if (event.which === KEY.DOWN || event.which === KEY.S){
      snakeHead.speedY = +20;
      snakeHead.speedX = 0;
	  }
  }

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

  function eatApple () {
    if (snakeHead.x == apple.x && snakeHead.y == apple.y) {
      bodyIncrease(); 
      respawnApple(); 
      score++ 
      console.log(score);
    }
  }   

  function repositionSnake(){
    for (var i = snakeBody.length - 1; i >= 1; i--){
       snakeBody[i].x = snakeBody[i - 1].x;
       snakeBody[i].y = snakeBody[i - 1].y;
       drawObject(snakeBody[i]);
    }
    
  }

  function snakeCheck () {
    if (collideCheck(snakeHead) == true) {
      reset(); 
    }
  }

  function appleCheck () {
    if (collideCheck(apple) == true) {
      respawnApple(); 
    }
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

  function drawObject(object) {
    $(object.id).css("left", object.x);
    $(object.id).css("top", object.y);
  }

  function drawScore() {
    $('#score').text("Current Session Score: " + score);
    $('#prevScore').text("Previous Session Score: " + prevScore);

  }

  function respawnApple () {
    apple.x = (Math.floor(Math.random() * 20)) * 40;
    apple.y = (Math.floor(Math.random() * 20)) * 40; 
  }

  function reset () {
    snakeHead.x = 0;
    snakeHead.y = 0;
    snakeHead.speedX = 0;
    snakeHead.speedY = 0;

    prevScore = score; 
    score = 0;

    $(".snake").remove();
    snakeBody.length = 1;
  }

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
