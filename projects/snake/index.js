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
  
  var apple = Factory("#apple", Math.floor(Math.random() * 800), Math.floor(Math.random() * 800));
  
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
    createBoard(); 
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
    var $snake = $("#snake");
    var $apple = $("#apple")
    if (doCollide($snake, $apple) == false) {
      console.log("test");
      $("#apple").hide(); 
    }
  }   

  function createBoard() {
    popup.style.display = "none";
    for (let i = 0; i < 100; i++) {
      let div = document.createElement("div");
      grid.appendChild(div);
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
  
  function spawnApple () {
    var apple = Factory("#apple", Math.random() * boardWidth, Math.random() * boardHeight, 0, 0);

  }

  function doCollide(a, b) {
    return !(
        ((a.y + a.height) < (b.y)) ||
        (a.y > (b.y + b.height)) ||
        ((a.x + a.width) < b.x) ||
        (a.x > (b.x + b.width))
    );
}
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
