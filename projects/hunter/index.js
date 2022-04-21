/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  let mouseX;
  let mouseY;
  
  $( "div" ).mousemove(function( event ) {
    var clientCoords = "( " + event.clientX + ", " + event.clientY + " )";
    $( "span" ).last().text( "( event.clientX, event.clientY ) : " + clientCoords );
    mouseX = event.clientX;
    mouseY = event.clientY; 
  });


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
  var gameItem = {};
  gameItem.x = 0;
  gameItem.y = 0;
  gameItem.speedX = 0;
  gameItem.speedY = 0;
  gameItem.id = "#gameItem";
  gameItem.it = true; 
  gameItem.points = 0;

var gameItem2 = {};
  gameItem2.x = 50;
  gameItem2.y = 0;
  gameItem2.speedX = 0;
  gameItem2.speedY = 0;
  gameItem2.id = "#gameItem2";
  gameItem2.it = false; 
  gameItem2.points = 0;

var boardWidth = $('#board').width();	
var boardHeight = $('#board').height();

var gameItemWidth = $('#gameItem').width();	
var gameItemHeight = $('#gameItem').height();

var gameItem2Width = $('#gameItem2').width();
var gameItem2Height = $('#gameItem2').height();

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionAndRedrawGameItems();
    checkBoundaries();
    processTag(); 
  }
  
  /* 
  Called in response to events.
  */
  function checkBoundaries(){
    if (gameItem.x > boardWidth - gameItemWidth){ 
    	  gameItem.x = boardWidth - gameItemWidth;
		}
		if (gameItem.x < 0){ 
    	  gameItem.x = 0;
		}
		if (gameItem.y > boardHeight - gameItemHeight){ 
    	  gameItem.y  = boardHeight - gameItemHeight;
		}
		if (gameItem.y < 0){ 
    	  gameItem.y  = 0;
		}
		if (gameItem2.x > boardWidth - gameItem2Width){ 
    	  gameItem2.x = boardWidth - gameItem2Width;
		}
		if (gameItem2.x < 0){ 
    	  gameItem2.x = 0;
		}
		if (gameItem2.y > boardHeight - gameItem2Height){ 
    	  gameItem2.y= boardHeight - gameItem2Height;
		}
		if (gameItem2.y < 0){ 
    	  gameItem2.y= 0;
		}
  }

  function processTag() {
    if (gameItem.x === gameItem2.x && gameItem.y === gameItem2.y && gameItem.it === true) {
      gameItem.it = false;
      gameItem2.it = true;
      gameItem2.x = 500;
      gameItem2.y = 500;
      gameItem.x = 0;
      gameItem.y = 0;
      console.log("Red Player is it")
      gameIt
    }
      if (gameItem.x === gameItem2.x && gameItem.y === gameItem2.y && gameItem.it === false) {
      gameItem.it = true;
      gameItem2.it = false;
      gameItem2.x = 0;
      gameItem2.y = 0;
      gameItem.x = 500;
      gameItem.y = 500;
      console.log("Blue Player is it")
    } 
  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function repositionAndRedrawGameItems() {
    gameItem.x += mouseX;
    gameItem.y += mouseY;
    $("#gameItem").css("left", mouseX - 380);
    $("#gameItem").css("top", mouseY - 20);
    gameItem2.x += gameItem2.speedX;
    gameItem2.y += gameItem2.speedY;
    $("#gameItem2").css("left", gameItem2.x);
    $("#gameItem2").css("top", gameItem2.y);
  }
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
