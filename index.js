var colorArray = ["red","yellow","blue","green"];
var gameSequence = [];
var userSequence = [];
var start = false;
var Level = 0;
var index =0;

$(document).keypress(function (e) { 
    
   if(e.key==="Enter"){
       if(!start){
        start = true;
        setTimeout(nextSequence,150);
       }
   }   
});

$(".btn").click(function(){
    var userChosenColor = this.getAttribute("id");
    playSound(userChosenColor);
    animate(userChosenColor);
    userSequence.push(userChosenColor);
    index = userSequence.length-1;
    checkAnswer(index);
});


function nextSequence(){
    Level++;
    $("h1").text("Level "+Level);
    var v = Math.floor(Math.random()*4);
    var nextColor = colorArray[v];
    // jquery ko hum html elements ke lia use krte h
    $("."+ nextColor).fadeOut(90).fadeIn(90);
    playSound(nextColor);
    gameSequence.push(nextColor);
    
}


function playSound(color){
    var sound = new Audio("sounds/" + color + ".mp3");
    sound.play();
}

function animate(color){
    $("."+color).addClass("pressed");
    setTimeout(function(){
        $("."+color).removeClass("pressed");
    },100)
}

function checkAnswer(ind){

    if(userSequence[ind]===gameSequence[ind]) {
          if(ind === Level-1) {
              setTimeout(nextSequence,300); 
              userSequence=[];
            }
          return "right";
    } 
    else{
        playSound("wrong");
        $("h1").text("Game Over, press enter to restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        start = false;
        Level = 0;
        gameSequence =[];
        userSequence =[];
        return "wrong";
    }
}

$(".Restart").click(function(){
    start = true;
    Level = 0;
    gameSequence =[];
    userSequence =[];
    setTimeout(nextSequence,150);

});