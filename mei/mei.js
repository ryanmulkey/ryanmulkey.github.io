$(document).ready(runProgram);

function runProgram(){
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');

console.log(dd);

$("#1").hide();
$("#2").hide();
$("#3").hide();
$("#4").hide();
$("#5").hide();
$("#6").hide();
$("#7").hide();
$("#8").hide();
$("#9").hide();
//$("#10").hide();
$("#11").hide();
$("#12").hide();
$("#13").hide();
$("#14").hide();
$("#5").hide();



if (dd == 17) {
    $("#1").show();
}
}