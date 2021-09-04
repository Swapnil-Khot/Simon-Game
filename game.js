const buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var level = 0;
var started = false;

function nextSequence() {

    randomNumber = Math.floor((Math.random()*buttonColours.length));

    flashButton(buttonColours[randomNumber]);
    gameAudio(buttonColours[randomNumber]);

    gamePattern.push(buttonColours[randomNumber]);
    level+=1;
    $("h1").text("level "+(level));
}

function flashButton(buttoncolor){
    $("."+buttoncolor).fadeOut(100).fadeIn(100);
}

function gameAudio(color){
    var audio = new Audio("./sounds/"+color+".mp3");
    audio.play();
}

function animatePress(currentcolor){
    $("."+currentcolor).addClass("pressed");
    setTimeout(() => {  $("."+currentcolor).removeClass("pressed"); }, 100);
}

function checkAnswer(){
    for(i=0;i<=gamePattern.length;i++){
        if (gamePattern[i]===userPattern[i]){
            // console.log(gamePattern[i],userPattern[i]);
            // console.log("hello");
            started=true
        }else{
            gameOver()
            started=false
            break;
        }
    }
    userPattern=[];
    if (started==true){
        setTimeout(nextSequence,500)
        console.log("hello")
    }else{
        console.log("world")
    }
}

function gameOver(){
    $("body").addClass("game-over");
    setTimeout(() => {  $("body").removeClass("game-over"); }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    var overGame = new Audio("./sounds/wrong.mp3");
    overGame.play();
    gamePattern=[]
    userPattern=[]
    level=0
}

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    animatePress(userChosenColour);
    gameAudio(userChosenColour)
    userPattern.push(userChosenColour)
    if (userPattern.length == gamePattern.length){
        checkAnswer(userPattern,gamePattern)
    }
});

$(document).keypress(function (){
    if (!started){
        nextSequence();
        started = true;
    }
});