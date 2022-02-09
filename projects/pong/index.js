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
    "UP": 38,
    "DOWN": 40,    
    "W": 83,
    "S": 87,    
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
    instance.score = 0; 
    
    return instance;
  }

  var paddleLeft = Factory("#paddleLeft", 10, 0, 0, 0);
  var paddleRight = Factory("#paddleRight", 727, 0, 0, 0);
  var box = Factory("#box", 350 , 250, Math.round(Math.random()) * 2 - 1, Math.round(Math.random()) * 2 - 1);


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
    doCollide(paddleLeft, box);
    doCollide(paddleRight, box);
    boxBounds();
    drawScore();
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.S){
      paddleLeft.speedY = -2;
      paddleLeft.speedX = 0;
    }
    if (event.which === KEY.W){
      paddleLeft.speedY = +2;
      paddleLeft.speedX = 0;
	}
	  
    if (event.which === KEY.DOWN){
      paddleRight.speedY = +2;
      paddleRight.speedX = 0;
    }
    if (event.which === KEY.UP){
      paddleRight.speedY = -2;
      paddleRight.speedX = 0;
	}

  }
  function handleKeyUp(event) {
    if (event.which === KEY.W || event.which === KEY.S){
      paddleLeft.speedY = 0;
    }
    if (event.which === KEY.UP || event.which === KEY.DOWN){
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
    if (id.x > boardWidth - id.width){ 
      id.x  = boardWidth - id.width;
    }  
    if (id.x < 0){ 
      id.x  = 0;
    }

  }
  
  function doCollide(obj1, obj2) {
    obj1.leftX = obj1.x;
    obj1.topY = obj1.y;
    obj1.rightX = obj1.leftX + obj1.width;
    obj1.bottomY = obj1.y + obj1.height;
    
    obj2.leftX = obj2.x;
    obj2.topY = obj2.y;
    obj2.rightX = obj2.leftX + obj1.width;
    obj2.bottomY = obj2.y + obj2.height;

	if((obj1.rightX > obj2.leftX) &&
      (obj1.leftX < obj2.rightX) &&
       (obj1.bottomY > obj2.topY) &&
       (obj1.topY < obj2.bottomY))
    {
      obj2.speedX = -(0.5 + obj2.speedX);
      obj2.speedY = (0.5 + obj2.speedY);

      
    } else {
      return false
    }
		
  }
  function boxBounds () {
    if (box.x < 0 + box.width) {
      $("#box").hide()
      paddleRight.score = paddleRight.score + 1;
      setTimeout(function(){
        $("#box").show()
        box.x = 100;
        box.y = 100;
        box.speedX = Math.round(Math.random()) * 2 - 1;
        box.speedY = Math.round(Math.random()) * 2 - 1;
      }, 2000); 
    } else if (box.x > boardWidth - (1 + box.width)) {
      $("#box").hide()
      paddleLeft.score = paddleLeft.score + 1;
      setTimeout(function(){
        $("#box").show()
        box.x = 100;
        box.y = 100;
        box.speedX = Math.round(Math.random()) * 2 - 1;
        box.speedY = Math.round(Math.random()) * 2 - 1;
      }, 2000); 
    }

    if (box.y < 0.1 || box.y > boardHeight - (1 + box.height)) {
      box.speedY = -box.speedY;
    }
  }

  function drawScore() {
    setTimeout(function(){
    $('#scorePaddleLeft').text(paddleLeft.score);
    $('#scorePaddleRight').text(paddleRight.score);
    }, 2000);
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function repositionAndRedrawGameItems() {
    paddleLeft.y += paddleLeft.speedY;
    $("#paddleLeft").css("left", paddleLeft.x);
    $("#paddleLeft").css("top", paddleLeft.y);

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
