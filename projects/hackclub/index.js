$(document).ready(runProgram);

function runProgram(){

var KEY = {
    "LEFT": 37,
    "RIGHT": 39,
    "UP": 38,
    "DOWN": 40,
  
    "A": 65,
    "W": 87,
    "S": 83,
    "D": 68,

    "SPACE": 32,
};

$(document).on('keydown', handleKeyDown);

  $("#blue").click(blueClick); 
  function blueClick () {
      $(".topnav").css("background-color", "blue");
      $("#fontlab").css("outline-color", "blue");
      $("#colorlab").css("outline-color", "blue");
      $("body").css("background-color","CornflowerBlue");
  }
  $("#red").click(redClick);
  function redClick() {
      $(".topnav").css("background-color", "red");
      $("#fontlab").css("outline-color", "red");
      $("#colorlab").css("outline-color", "red");
      $("body").css("background-color","Tomato");

      $("#red:active").css("transform", "translateY (4px);")
      $("#red:active").css("background-color:","red")
      $("#red:active").css("box-shadow", "0 5px #666;")
  }
  $("#green").click(greenClick); 
  function greenClick() {
      $(".topnav").css("background-color", "green");
      $("#fontlab").css("outline-color", "green");
      $("#colorlab").css("outline-color", "green");
      $("body").css("background-color","LightGreen");
  }
  $("#yellow").click(yellowClick); 
  function yellowClick() {
      $(".topnav").css("background-color", "goldenrod");
      $("#fontlab").css("outline-color", "goldenrod");
      $("#colorlab").css("outline-color", "goldenrod");
      $("body").css("background-color","gold");
  }

  function reset() {
    $(".topnav").css("background-color", "black");
    $("#fontlab").css("outline-color", "rgb(65, 64, 64)");
    $("#colorlab").css("outline-color", "rgb(65, 64, 64)");
    $("body").css("background-color","darkgrey");
  }

  function handleKeyDown(event) {
  if (event.which === KEY.LEFT || event.which === KEY.A){
      redClick();
    }

    if (event.which === KEY.RIGHT || event.which === KEY.D){
      yellowClick();
    } 

  if (event.which === KEY.UP || event.which === KEY.W){
    greenClick();
  } 

  if (event.which === KEY.DOWN || event.which === KEY.S){
    blueClick();
    } 

  if (event.which === KEY.SPACE){
    reset();
    } 
}

  $("#serif").click(function() {
    $("*").css("font-family", "serif");
  });
  $("#sansserif").click(function() {
    $("*").css("font-family", "sans-serif");
  });
  $("#monospace").click(function() {
    $("*").css("font-family", "monospace");
  });
  $("#cursive").click(function() {
    $("*").css("font-family", "cursive");
  });

}