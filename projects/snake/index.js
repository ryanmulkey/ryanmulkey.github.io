/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
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
  var snake = {};
  snake.x = 0;
  snake.y = 0;
  snake.speedX = 0;
  snake.speedY = 0;
  snake.id = "#snake";
  snake.it = true; 
  snake.points = 0;

  var apple = {};
  apple.x = 50;
  apple.y = 50;
  apple.speedX = 0;
  apple.speedY = 0;
  apple.id = "#apple";
  
var boardWidth = $('#board').width();	
var boardHeight = $('#board').height();

var snakeWidth = $('#snake').width();	
var snakeHeight = $('#snake').height();

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);                           // change 'eventType' to the type of event you want to handle


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
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.LEFT || event.which === KEY.A){
  	  snake.speedX = -1;
      snake.speedY = 0;
  	}
  	if (event.which === KEY.RIGHT || event.which === KEY.D){
  	  snake.speedX = +1;
      snake.speedY = 0;
	  }
    if (event.which === KEY.UP || event.which === KEY.W){
      snake.speedY = -1;
      snake.speedX = 0;
    }
    if (event.which === KEY.DOWN || event.which === KEY.S){
      snake.speedY = +1;
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

  
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function repositionAndRedrawGameItem() {
    snake.x += snake.speedX;
    snake.y += snake.speedY;
    $("#snake").css("left", snake.x);
    $("#snake").css("top", snake.y);
    $
  }
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
