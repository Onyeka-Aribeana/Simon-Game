const buttonColours = ["red", "blue", "green", "yellow"] 
let gamePattern = [];
let userClickedPattern = [];
let randomChosenColour;
let startToToggle = false;
let level = 0;

function startOver(){
    level = 0;
    gamePattern = [];
    startToToggle = false; 
}
 
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("sucess");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){nextSequence()}, 1000);
        }
    }
    
    else {
        let audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over");}, 200)
        $("h1").text("Game Over, Press any key to restart")
        startOver();
    }
}

function playSound(name){
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function animatePress(currentColor){
    $(`#${currentColor}`).addClass("pressed");
    setTimeout(function(){$(`#${currentColor}`).removeClass("pressed");}, 100);
}

function nextSequence() {
    userClickedPattern = [];
    level += 1;
    $("h1").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];
    playSound(randomChosenColour)
    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    gamePattern.push(randomChosenColour);
}

$(document).keypress(function(){
    if(startToToggle === false) {
        nextSequence()
    }
    startToToggle = true;
})

$(".btn").click(function(){
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length - 1)
    playSound(userChosenColour);
    animatePress(userChosenColour);
})
