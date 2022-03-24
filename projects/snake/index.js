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

  var snake = Factory("#snake", 0, 0, 0, 0);
  
  var apple = Factory("#apple", (Math.floor(Math.random() * 20)) * 40, (Math.floor(Math.random() * 20)) * 40, 0, 0);
  
  var score = 0;
  var snakeBody = [snake]; 
  
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
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.LEFT || event.which === KEY.A){
  	  snake.speedX = -20;
      snake.speedY = 0;
  	}
  	if (event.which === KEY.RIGHT || event.which === KEY.D){
  	  snake.speedX = +20;
      snake.speedY = 0;
	  }
    if (event.which === KEY.UP || event.which === KEY.W){
      snake.speedY = -20;
      snake.speedX = 0;
    }
    if (event.which === KEY.DOWN || event.which === KEY.S){
      snake.speedY = +20;
      snake.speedX = 0;
	  }
  }

  function checkBoundaries(){
    if (snake.x > boardWidth - snakeWidth){ 
    	  snake.x = boardWidth - snakeWidth;
		}
		if (snake.x < 0){ 
    	  snake.x = 0;
		}
		if (snake.y > boardHeight - snakeHeight){ 
    	  snake.y  = boardHeight - snakeHeight;
		}
		if (snake.y < 0){ 
    	  snake.y  = 0;
		}
  }

  function eatApple () {
    if (snake.x == apple.x && snake.y == apple.y) {
      bodyIncrease(); 
      respawnApple(); 
      score++ 
    }
  }   

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function repositionAndRedrawGameItem() {
    snake.x += snake.speedX;
    snake.y += snake.speedY;
    $("#snake").css("left", snake.x);
    $("#snake").css("top", snake.y);
    
    $("#apple").css("left", apple.x);
    $("#apple").css("top", apple.y);
  }
  
  function respawnApple () {
    //$("#apple").hide(); 
    apple.x = (Math.floor(Math.random() * 20)) * 40;
    apple.y = (Math.floor(Math.random() * 20)) * 40; 
    //$("#apple").show(); 
  }

  function bodyIncrease () {
    
  }
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
