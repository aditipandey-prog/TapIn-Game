var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
//to keep track pf whetehr the game has started or not
var toggle = false;

var level = 0;
//KeyPress to start the Game
$(document).keypress(function () {
    if (!toggle) {
        nextSequence();
        toggle = true;
    }
})

$(".btn").click(function () {
    var userChosenColor = this.id;
    animatePress(userChosenColor);

    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);

    comapareResult(userClickedPattern.length-1);
})

function comapareResult(index) {
    if(userClickedPattern[index]===gamePattern[index]){
     if( userClickedPattern.length===gamePattern.length){
 
         setTimeout(function () {
             nextSequence();
           }, 1000);
     }
    }
    else{
              playSound("wrong");
              $("body").addClass("gameOver");
              setTimeout(function(){
                 $("body").removeClass("gameOver");
              },200);
              $("h1").text("Game Over, Press Any Key to Restart");
              startOver();
    }
 
 }

function nextSequence() {
    userClickedPattern = [];
    $("h1").text("Level " + level);
    level++;
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

}


//Function to play Sound
function playSound(color) {

    var sound = new Audio("./sounds/" + color + ".mp3");
    sound.play();

}
//Function to animate button (Add Shadow)

function animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);

}
function startOver(){
   toggle=false;
   gamePattern = [];
   level=0;
}
//
