let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "green", "blue"];

let started = false;
let level = 0;
let higestScore = 0;

let h2 = document.querySelector("h2");


document.addEventListener("keypress", function(){
    if(started === false){
        started = true;
        levelUp();
    }
});


function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);
};


function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    }, 250);
};


function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random()*4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    gameFlash(randBtn);
};


function checkBtn(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length === gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    } else{
        if(level > higestScore){
            higestScore=level;
        }
        h2.innerHTML = `Game Over! you score was: <b>${level}</b> 
        <br />Your higest score was: ${higestScore}
        <br /> Press any key to start.`;
        document.querySelector("body").classList.add("game-over");
        document.querySelector(".btn-container").classList.add("shake");
        setTimeout(function(){
            document.querySelector("body").classList.remove("game-over");
            document.querySelector(".btn-container").classList.remove("shake");
            smoothRestart();
        }, 500);
    }
};


function btnPress(){
    if(started === false){
        started = true;
        levelUp();
        return;
    };

    let btn = this;
    userFlash(btn);

   let userColor = btn.getAttribute("id");
   userSeq.push(userColor);
   checkBtn(userSeq.length-1);
};


let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
};


function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;   
};


function smoothRestart(){
    reset();
    document.body.classList.add("restart");

    setTimeout(() => {
        document.body.classList.remove("restart");
    }, 400);
}
