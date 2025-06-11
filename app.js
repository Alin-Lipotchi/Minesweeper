// Variables

const mainWindow = document.querySelector("#main-window");
const bombsLeft = document.querySelector("#bombs-left");
const actionButton = document.querySelector("#action-button");
const timePassed = document.querySelector("#time-passed");
const gameWindow = document.querySelector("#game-window");

let blocks;
let stopTimer;

// Funtions

const restartTimer = () => {
    stopTimer = setInterval(() => {
        if(timePassed.textContent >= 998) clearInterval(stopTimer);
        if(timePassed.textContent < 99) {
            if(timePassed.textContent < 9) {
                timePassed.textContent =`00${+timePassed.textContent + 1}`;
            } else {
                timePassed.textContent =`0${+timePassed.textContent + 1}`;
            }
        } else {
            timePassed.textContent = +timePassed.textContent + 1;
        }
        
    }, 1000);
    return stopTimer;
}

const startGame = () => {
    timePassed.textContent = "000";
    clearInterval(stopTimer);
    restartTimer();
    fillWithBlocks();
    assignBombs();
}

const fillWithBlocks = () => {
    gameWindow.innerHTML = "";
    for(let y = 0; y < 10; y++) {
        for(let x = 0; x < 10; x++) {
            gameWindow.innerHTML += `<div class="block" data-x=${x} data-y=${y}></div>`;
        }
    }
    blocks = document.querySelectorAll(".block");
}

const assignBombs = () => {
    
}

actionButton.addEventListener("click",startGame);