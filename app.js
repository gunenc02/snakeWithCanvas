let canvas = document.getElementById("gameBoard");
let ctx = canvas.getContext("2d");
let body = document.getElementById("body");

let startX = 100;
let startY = 50;
let endX = 200;
let endY = 50;
let playableCanvasHeightStart = 60;
let playableCanvasHeight = 500
let canvasHeight = 550;
let canvasWidth = 800;
var snakeArray = [
    [20, 140, 20, 150, 2],
    [20, 130, 20, 140, 2],
    [20, 120, 20, 130, 2]
];

let timer;
let directionNumber = 0;
let maxEatenApple;
let score = 0;
let gameSpeed = 100;
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
        lastY -= 10;
    }

    else if (directionNumber === 2) {
        lastY += 10;
    }

    else if (directionNumber === 3) {
        lastX -= 10;
    }

    else if (directionNumber === 4) {
        lastX += 10;
    }

    newSegment(firstX, firstY, lastX, lastY, directionNumber);
    snakeDrawer();
}

function snakeDrawer() {

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
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

        if (Math.abs(prevX - snakeArray[i][0]) < 11 && Math.abs(prevY - snakeArray[i][1]) < 11) {
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

    centerX = Math.ceil(Math.random() * (canvasWidth - 20) + 5);
    centerY = Math.ceil(Math.random() * (playableCanvasHeight - 20) + 5);
    centerY += playableCanvasHeightStart;
    if (snakeLocation(centerX, centerY, 15)) {
       appleCreator();
    } else {
        randomAppleCreator();
    }    
}


function canvasPosition() {

    canvas.setAttribute("height", `${canvasHeight}`);
    canvas.setAttribute("width", `${canvasWidth}`);
    canvas.setAttribute("style", "border:5px solid black");

    canvas.style.top = "20%";
    canvas.style.left = "30%";
    canvas.style.position = "absolute";
    canvas.style.backgroundColor = "green";

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

    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI);
    ctx.fill();
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

    if (Math.abs(snakeArray[0][2] - centerX) <= 8 && Math.abs(snakeArray[0][3] - centerY) <= 8) {
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

        newSnakeSegment[1] += 10
    }

    else if (snakeArray[lastIndex - 1][4] === 2) {

        newSnakeSegment[1] -= 10;
    }

    else if (snakeArray[lastIndex][4] === 3) {

        newSnakeSegment[0] += 10;
    }

    else if (snakeArray[lastIndex][4] === 4) {

        newSnakeSegment[0] -= 10;
    }
    snakeArray.push(newSnakeSegment);


}

function positionFormatter() {

    let firstX = snakeArray[0][0];
    let firstY = snakeArray[0][1];
    let lastX = snakeArray[0][2];
    let lastY = snakeArray[0][3]

    if (snakeArray[0][2] > canvasWidth) {
        lastX = 10;
        firstX = 0;

    }

    else if (snakeArray[0][2] < 0) {
        lastX = canvasWidth - 10;
        firstX = canvasWidth;

    }

    else if (snakeArray[0][3] > canvasHeight) {
        lastY = playableCanvasHeightStart + 5;
        firstY = playableCanvasHeightStart - 5;

    }

    else if (snakeArray[0][3] < playableCanvasHeightStart) {
        lastY = canvasHeight - 10;
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
    ctx.fillText(`Max Score: ${maxEatenApple}`, 770, 30);

    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.moveTo(0, 52);
    ctx.lineTo(800, 52);
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
    ctx.fillText(`GAME OVER`, 400, 225);

    ctx.font = "20px sanserif";
    ctx.textAlign = "center";
    ctx.fillStyle = "brown"
    ctx.fillText(`press R to try again`, 400, 325);

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