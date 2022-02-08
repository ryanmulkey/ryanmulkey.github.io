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

  var paddleLeft = Factory("#paddleLeft", 10, 0, 0, 0);
  var paddleRight = Factory("#paddleRight", 417, 0, 0, 0);
  var box = Factory("#box", 100, 0, -1, -1);


var boardWidth = $('#board').width();	
var boardHeight = $('#board').height();

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
    repositionAndRedrawGameItems();
    checkBoundaries(paddleLeft);
    checkBoundaries(paddleRight);
    checkBoundaries(box);

  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.UP){
      paddleLeft.speedY = -2;
      paddleLeft.speedX = 0;
    }
    if (event.which === KEY.DOWN){
      paddleLeft.speedY = +2;
      paddleLeft.speedX = 0;
	}
	  
    if (event.which === KEY.W){
      paddleRight.speedY = +2;
      paddleRight.speedX = 0;
    }
    if (event.which === KEY.S){
      paddleRight.speedY = -2;
      paddleRight.speedX = 0;
	}

  }
  function handleKeyUp(event) {
    if (event.which === KEY.LEFT || event.which === KEY.RIGHT){
  	  paddleLeft.speedX = 0;
  	}
    if (event.which === KEY.UP || event.which === KEY.DOWN){
      paddleLeft.speedY = 0;
    }
	  if (event.which === KEY.A || event.which === KEY.D){
  	  paddleRight.speedX = 0;
  	}
    if (event.which === KEY.W || event.which === KEY.S){
      paddleRight.speedY = 0;
    }

  }

  function checkBoundaries(id){
		if (id.y > boardHeight - id.height){ 
    	  id.y  = boardHeight - id.height;
		}
		if (id.y < 0){ 
    	  id.y  = 0;
    }
    if (id.x > boardWidth - id.height){ 
      id.y  = boardWidth - id.height;
    }
    if (id.x < 0){ 
      id.x  = 0;
    }

  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function repositionAndRedrawGameItems() {
    paddleLeft.x += paddleLeft.speedX;
    paddleLeft.y += paddleLeft.speedY;
    $("#paddleLeft").css("left", paddleLeft.x);
    $("#paddleLeft").css("top", paddleLeft.y);

    paddleRight.x += paddleRight.speedX;
    paddleRight.y += paddleRight.speedY;
    $("#paddleRight").css("left", paddleRight.x);
    $("#paddleRight").css("top", paddleRight.y);

    box.x += box.speedX;
    box.y += box.speedY;
    $("#box").css("left", box.x);
    $("#box").css("top", box.y);
  }
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
