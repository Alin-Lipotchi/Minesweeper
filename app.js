// Variables

const mainWindow = document.querySelector("#main-window");
const bombsLeft = document.querySelector("#bombs-left");
const actionButton = document.querySelector("#action-button");
const timePassed = document.querySelector("#time-passed");
const gameWindow = document.querySelector("#game-window");

const bombs = 10;

let noOfBlocks;
let blockMap = [];
let stopTimer;
let col = 10;
let lin = 10;
const bombsLocation = [];

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

const fillWithBlocks = () => {
    gameWindow.innerHTML = "";
    for(let y = 0; y < col; y++) {
        for(let x = 0; x < lin; x++) {
            gameWindow.innerHTML += `<div class="block" data-x=${x} data-y=${y} data-no-of-bombs="0"></div>`;
        }
    }

    noOfBlocks = document.querySelectorAll(".block");

    blockMap = [...[]];
    let k = 0;

    for(let y = 0; y < col; y++) {
        blockMap.push([]);
        for(let x = 0; x < lin; x++) {
            blockMap[y].push(noOfBlocks[k]);
            blockMap[y][x].addEventListener("click", dig);
            k++;
        }
    }
}

const assignBombs = () => {
    let k = 0;
    while (k < bombs) {
        k++;
        let x = Math.floor(Math.random() * col);
        let y = Math.floor(Math.random() * lin);
        if(blockMap[x][y].dataset.bomb !== "true") {
            blockMap[x][y].dataset.bomb = "true";
            // blockMap[x][y].className = "hole";
            // blockMap[x][y].textContent = "b";
            assignDigits(x, y);
        } else {
            k--;
        }
    }
}

const assignDigits = (x, y) => {
    // console.log(x, y);
    for(let j = -1; j < 2; j++) {
        for(let i = -1; i < 2; i++) {
            if((x+i >= 0 && x+i < col) && (y+j >= 0 && y+j < lin)) {
                if(i === 0 && j === 0) continue;
                if(blockMap[x+i][y+j].dataset.bomb == "true") continue;
                blockMap[x+i][y+j].dataset.noOfBombs = +blockMap[x+i][y+j].dataset.noOfBombs + 1;
                // blockMap[x+i][y+j].textContent = blockMap[x+i][y+j].dataset.noOfBombs;
            }
        }
    }
}

const dig = () => {
    console.log("DIG");
} 

const startGame = () => {
    timePassed.textContent = "000";
    clearInterval(stopTimer);
    restartTimer();
    fillWithBlocks();
    assignBombs();
}

actionButton.addEventListener("click", startGame);
