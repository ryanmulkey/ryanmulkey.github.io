/* global $, sessionStorage */

$(document).ready(runProgram); 
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = {
    "UP": 38,
    "DOWN": 40,    
    "W": 83,
    "S": 87,    
  };

  var scoreLeft = 0;
  var scoreRight = 0;
  var boxPing = 0; 
  var multiplier = 1; 
  var winState = prompt("How many points to win?")
  var namePaddleLeft = prompt("Player 1 Name")
  var namePaddleRight = prompt("Player 2 Name")
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

var paddleLeft = Factory("#paddleLeft", 10, 225, 0, 0);
var paddleRight = Factory("#paddleRight", 727, 225, 0, 0);
var box = Factory("#box", 350 , 250, (Math.round(Math.random()) * 6 - 3), (Math.round(Math.random()) * 6 - 3));

var boardWidth = $('#board').width();	
var boardHeight = $('#board').height();

var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);
$(document).on('keydown', handleKeyDown);
$(document).on('keyup', handleKeyUp);


  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function newFrame() {
    repositionAndRedrawGameItems();
    calcScore();
    drawPlayerInfo();
    checkBoundaries(paddleLeft);
    checkBoundaries(paddleRight);
    checkBoundaries(box);
    doCollide(paddleLeft, box);
    doCollide(paddleRight, box);
    boxBounds();
    heat();
    win();
  }
  
  function handleKeyDown(event) {
    if (event.which === KEY.S){
      paddleLeft.speedY = -4;
      paddleLeft.speedX = 0;
    }
    if (event.which === KEY.W){
      paddleLeft.speedY = +4;
      paddleLeft.speedX = 0;
	}
	  
    if (event.which === KEY.DOWN){
      paddleRight.speedY = +4;
      paddleRight.speedX = 0;
    }
    if (event.which === KEY.UP){
      paddleRight.speedY = -4;
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
      if (obj2.speedX > 0) {
        obj2.speedX = -(0.2 + obj2.speedX);
        boxPing++; 
      } else if (obj2.speedX < 0) {
        obj2.speedX = -(-0.2 + obj2.speedX);
        boxPing++;
      }
      if (obj2.speedY > 0) {
        obj2.speedY = (0.25 + obj2.speedY);
      } else if (obj2.speedY < 0) {
        obj2.speedY = (-0.25 + obj2.speedY);
      }      
    } else {
      return false
    }
		
  }
  function boxBounds () {
    if (box.x < 0 + box.width) {
      reset();
    } else if (box.x > boardWidth - (1 + box.width)) {
      reset();
    }
    if (box.y < 0.1 || box.y > boardHeight - (1 + box.height)) {
      box.speedY = -box.speedY;
    }
  }

  function calcScore () {
    if (box.x > boardWidth - (1 + box.width)) {
      scoreLeft = scoreLeft + multiplier;
    }
    if (box.x < 0 + box.width) {
      scoreRight = scoreRight + multiplier;
    }
  }

  function drawPlayerInfo() {
    $('#scorePaddleLeft').text(scoreLeft);
    $('#scorePaddleRight').text(scoreRight);
    $('#namePaddleLeft').text(namePaddleLeft);
    $('#namePaddleRight').text(namePaddleRight);
  }

  function win () {
    if (scoreLeft >= winState) {
      $("#winPaddleLeft").append(namePaddleLeft + " wins!");
      scoreLeft = 0;
      reset();
    } else if (scoreRight >= winState) {
      $("#winPaddleRight").append(namePaddleRight + " wins!");
      scoreRight = 0; 
      reset();
    }
  }
  function heat() {
    if (boxPing === 0) {
      onFire(false);
    } else if (boxPing == 1) {
      $("#box").css("background-color", "rgb(255, 230, 230)")
      $("body").css("background-color", "rgb(230, 230, 230)")
    } else if (boxPing == 2) {
      $("#box").css("background-color", "rgb(255, 205, 205)")
      $("body").css("background-color", "rgb(205, 205, 205)")
    } else if (boxPing == 3) {
      $("#box").css("background-color", "rgb(255, 180, 180)")
      $("body").css("background-color", "rgb(180, 180, 180)")
    } else if (boxPing == 4) {
      $("#box").css("background-color", "rgb(255, 155, 155)")
      $("body").css("background-color", "rgb(155, 155, 155)")
    } else if (boxPing == 5) {
      $("#box").css("background-color", "rgb(255, 130, 130)")
      $("body").css("background-color", "rgb(130, 130, 130)")
    } else if (boxPing == 6) {
      $("#box").css("background-color", "rgb(255, 105, 105)")
      $("body").css("background-color", "rgb(105, 105, 105)")
    } else if (boxPing == 7) {
      $("#box").css("background-color", "rgb(255, 80, 80)")
      $("body").css("background-color", "rgb(80, 80, 80)")
    } else if (boxPing == 8) {
      $("#box").css("background-color", "rgb(255, 55, 55)")
      $("body").css("background-color", "rgb(55, 55, 55)")
    } else{
      onFire(true);
    } 
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
  
  function reset() {
    $("#box").hide()
    box.speedX = 0;
    box.speedY = 0;
    box.x = 350;
    box.y = 250;
    boxPing = 0; 
      setTimeout(function(){
        $("#box").show()
          box.speedX = Math.round(Math.random()) * 6 - 3;
          box.speedY = Math.round(Math.random()) * 6 - 3;
    }, 2000); 
  } 

  function onFire (bool) {
    if (bool == false) {
      $("#box").css("background-color", "rgb(255, 255, 255)")
      $("body").css("background-color", "rgb(255, 255, 255)")
      $("#paddleLeft").css("background-color", "rgb(255, 255, 255)")
      $("#paddleRight").css("background-color", "rgb(255, 255, 255)")
      $("#scorePaddleLeft").css("color", "rgb(255, 255, 255)")
      $("#scorePaddleRight").css("color", "rgb(255, 255, 255)")
      $("#namePaddleLeft").css("color", "rgb(255, 255, 255)")
      $("#namePaddleRight").css("color", "rgb(255, 255, 255)")
      $("#board").css("border", "1px solid white")
      $("#board").css("background-image", "url(background.png)")
      $("#streak").hide()
      multiplier = 1; 
    } else if (bool == true) {
      $("#box").css("background-color", "rgb(255, 30, 30)")
      $("body").css("background-color", "rgb(30, 30, 30)")
      $("#paddleLeft").css("background-color", "rgb(255, 170, 51)")
      $("#paddleRight").css("background-color", "rgb(255, 170, 51)")
      $("#scorePaddleLeft").css("color", "rgb(240, 128, 0)")
      $("#scorePaddleRight").css("color", "rgb(240, 128, 0)")
      $("#namePaddleLeft").css("color", "rgb(240, 128, 0)")
      $("#namePaddleRight").css("color", "rgb(240, 128, 0)")
      $("#board").css("border", "1px solid red")
      $("#board").css("background-image", "url(backgroundFire.png)")
      $("#streak").show()
      multiplier = 2; 
    }
  }
  function endGame() {
    clearInterval(interval);

    $(document).off();
  }
  
}
