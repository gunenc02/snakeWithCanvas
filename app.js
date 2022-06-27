let canvas = document.getElementById("gameBoard");
let ctx = canvas.getContext("2d");
let body = document.getElementById("body");


let startX = 100;
let startY = 50;
let endX = 200;
let endY = 50;
let playableCanvasHeightStart = 60;
let playableCanvasHeight = 600
let canvasHeight = 660;
let canvasWidth = 1075;
var snakeArray = [
    [20, 220, 20, 270, 2],
    [20, 170, 20, 220, 2],
    [20, 120, 20, 170, 2]
];
let centerX = 0;
let centerY = 0;
let timer;
let directionNumber = 0;
let maxEatenApple;
let score = 0;
let gameSpeed = 200;
let isDirectionSelectable = true;

body.addEventListener('keydown', function (e) {

    if (e.key === "r" && directionNumber === 6) {
        document.location.reload();
    }
    if (isDirectionSelectable) {

        if (directionNumber === 0 && (e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowRight")) {
            startGame();
        }

        if (e.key === "ArrowUp" && (directionNumber !== 1 && directionNumber !== 2 && directionNumber !== 6 && directionNumber !== 0)) {
            directionNumberChanger(1);
            isDirectionSelectable = false;
        }

        else if (e.key === "ArrowDown" && (directionNumber !== 1 && directionNumber !== 2 && directionNumber !== 6)) {
            directionNumberChanger(2);
            isDirectionSelectable = false;
        }

        else if (e.key === "ArrowLeft" && (directionNumber !== 3 && directionNumber !== 4 && directionNumber !== 6)) {
            directionNumberChanger(3);
            isDirectionSelectable = false;
        }

        else if (e.key === "ArrowRight" && (directionNumber !== 3 && directionNumber !== 4 && directionNumber !== 6)) {
            directionNumberChanger(4);
            isDirectionSelectable = false;
        }
    }
});

function decidingCreation() {

    let firstX = snakeArray[0][2];
    let firstY = snakeArray[0][3];
    let lastX = snakeArray[0][2];
    let lastY = snakeArray[0][3];

    if (directionNumber === 1) {
        lastY -= 50;
    }

    else if (directionNumber === 2) {
        lastY += 50;
    }

    else if (directionNumber === 3) {
        lastX -= 50;
    }

    else if (directionNumber === 4) {
        lastX += 50;
    }

    newSegment(firstX, firstY, lastX, lastY, directionNumber);
    snakeDrawer();
}

function snakeDrawer() {

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    let img = document.getElementById("canvasBackground");
    ctx.drawImage(img,0,0);
    if (isAppleEaten()) {
        randomAppleCreator();
        fasterGame();
    } else {
        appleCreator();
    }

    snakeArray.pop();

    let prevX = snakeArray[0][0];
    let prevY = snakeArray[0][1];
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(snakeArray[0][2], snakeArray[0][3]);
    ctx.lineWidth = 10;

    for (let i = 0; i < snakeArray.length; i++) {

        if (Math.abs(prevX - snakeArray[i][0]) < 51 && Math.abs(prevY - snakeArray[i][1]) < 51) {
            ctx.lineTo(snakeArray[i][0], snakeArray[i][1]);
        } else {
            ctx.stroke();
            ctx.lineJoin = "round";
            ctx.beginPath();
            ctx.moveTo(snakeArray[i][2], snakeArray[i][3]);
            ctx.lineWidth = 10;
        }

        prevX = snakeArray[i][0];
        prevY = snakeArray[i][1];
    }

    ctx.stroke();
    scoreTable();
    isGameFinished();

    isDirectionSelectable = true;
}

function randomAppleCreator() {

    centerX = Math.ceil(Math.random() * (canvasWidth - 60));
    centerY = Math.ceil(Math.random() * (playableCanvasHeight - 60));
    centerY += playableCanvasHeightStart;
    if (snakeLocation(centerX, centerY, 75)) {
       appleCreator();
    } else {
        randomAppleCreator();
    }    
}


function canvasPosition() {
    

    canvas.setAttribute("height", `${canvasHeight}`);
    canvas.setAttribute("width", `${canvasWidth}`);
    canvas.setAttribute("style", "border:5px solid black");

    canvas.style.top = "50%";
    canvas.style.left = "50%";
    canvas.style.transform = "translate(-50%, -55%)"
    canvas.style.position = "absolute";

    let img = document.getElementById("canvasBackground");
    ctx.drawImage(img,0,0);

    ctx.beginPath();

    ctx.lineJoin = "round";
    ctx.lineWidth = 10;

    ctx.moveTo(snakeArray[0][2], snakeArray[0][3]);
    ctx.lineTo(snakeArray[0][0], snakeArray[0][1]);
    ctx.lineTo(snakeArray[1][0], snakeArray[1][1]);
    ctx.lineTo(snakeArray[2][0], snakeArray[2][1]);

    ctx.stroke();

    scoreTable();

}

function appleCreator() {

    let img = document.getElementById("orange");
    ctx.drawImage(img, centerX, centerY);
}

function newSegment(firstX, firstY, lastX, lastY, directionNumber) {

    let newSegment = [0, 0, 0, 0, 0];
    newSegment[0] = firstX;
    newSegment[1] = firstY;
    newSegment[2] = lastX;
    newSegment[3] = lastY;
    newSegment[4] = directionNumber;

    snakeArray.unshift(newSegment);

    if (lastX < 0 || lastX > canvasWidth || lastY < playableCanvasHeightStart || lastY > canvasHeight) {
        positionFormatter();
    }

}

function isAppleEaten() {

    if (snakeArray[0][2] - centerX > 0 && snakeArray[0][2] - centerX < 60  && snakeArray[0][3] - centerY > 0 &&  snakeArray[0][3] - centerY < 60) {
        score++;
        grow();
        return true;
    }

    return false;
}

function grow() {

    let lastIndex = snakeArray.length - 1;
    let newSnakeSegment = [0, 0, 0, 0, 0];
    newSnakeSegment[0] = snakeArray[lastIndex][0];
    newSnakeSegment[1] = snakeArray[lastIndex][1];
    newSnakeSegment[2] = snakeArray[lastIndex][2];
    newSnakeSegment[3] = snakeArray[lastIndex][3];
    newSnakeSegment[4] = snakeArray[lastIndex][4];

    if (snakeArray[lastIndex][4] === 1) {

        newSnakeSegment[1] += 50;
    }

    else if (snakeArray[lastIndex - 1][4] === 2) {

        newSnakeSegment[1] -= 50;
    }

    else if (snakeArray[lastIndex][4] === 3) {

        newSnakeSegment[0] += 50;
    }

    else if (snakeArray[lastIndex][4] === 4) {

        newSnakeSegment[0] -= 50;
    }
    snakeArray.push(newSnakeSegment);


}

function positionFormatter() {

    let firstX = snakeArray[0][0];
    let firstY = snakeArray[0][1];
    let lastX = snakeArray[0][2];
    let lastY = snakeArray[0][3]

    if (snakeArray[0][2] > canvasWidth) {
        lastX = 50;
        firstX = 0;

    }

    else if (snakeArray[0][2] < 0) {
        lastX = canvasWidth - 50;
        firstX = canvasWidth;

    }

    else if (snakeArray[0][3] > canvasHeight) {
        lastY = playableCanvasHeightStart + 25;
        firstY = playableCanvasHeightStart - 25;

    }

    else if (snakeArray[0][3] < playableCanvasHeightStart) {
        lastY = canvasHeight - 50;
        firstY = canvasHeight;

    }
    snakeArray.pop();
    newSegment(firstX, firstY, lastX, lastY);
}

function isGameFinished() {

    let snakeHeadX = snakeArray[0][2];
    let snakeHeadY = snakeArray[0][3];

    if (snakeLocation(snakeHeadX, snakeHeadY, 0)) {
        clearInterval(timer);
        directionNumber = 6;

        if (maxEatenApple < score) {
            setLocalStorage(score);
        }

        gameOverTable();

    }
}

function snakeLocation(locationX, locationY, difference) {

    if(difference === 0){
        for(let i = 0; i < snakeArray.length; i++){
            if(snakeArray[i][0] === locationX && snakeArray[i][1] === locationY){
                return true;
            }
        }
        return false;
    }

    else{
        for(let i = 0; i < snakeArray.length; i++){
            if(Math.abs(snakeArray[i][0] - locationX) < difference && Math.abs(snakeArray[i][1] - locationY) < difference){
                return false;
            }
        }
        return true
    }
}

function scoreTable() {


    if (localStorage.getItem("maxEatenApple") === null) {
        maxEatenApple = 0;
    } else {
        maxEatenApple = localStorage.getItem("maxEatenApple");
    }

    ctx.font = "20px sanserif";
    ctx.textAlign = "left";
    ctx.fillStyle = "brown"
    ctx.fillText(`Score: ${score}`, 20, 30);

    ctx.font = "20px sanserif";
    ctx.textAlign = "right";
    ctx.fillStyle = "brown";
    ctx.fillText(`Max Score: ${maxEatenApple}`, 1040, 30);

    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.moveTo(0, 52);
    ctx.lineTo(1075, 52);
    ctx.stroke();

}

function fasterGame() {

    if (score % 10 === 0) {
        gameSpeed = 2 * gameSpeed / 3
        clearInterval(timer);
        timer = setInterval(decidingCreation, gameSpeed);
    }

}

function gameOverTable() {

    ctx.font = "100px sanserif";
    ctx.textAlign = "center";
    ctx.fillStyle = "brown"
    ctx.fillText(`GAME OVER`, canvasWidth / 2, canvasHeight / 2 - 10);

    ctx.font = "20px sanserif";
    ctx.textAlign = "center";
    ctx.fillStyle = "brown"
    ctx.fillText(`press R to try again`, canvasWidth / 2, canvasHeight / 2 + 10);

}

function setLocalStorage(score) {
    localStorage.setItem("maxEatenApple", `${score}`)
}

function directionNumberChanger(num) {
    directionNumber = num;
}

function startGame() {

    timer = setInterval(decidingCreation, gameSpeed);
}

window.onload = () => {

    canvasPosition();
    randomAppleCreator();
}

function addingSnakeSprite() {

    let img = document.getElementById("snakeSprite");

    if(directionNumber === 1) {

    }
    else if(directionNumber === 2) {

    }
    else if(directionNumber === 3) {

    }
    else {
        ctx.drawImage(img)
    }
}