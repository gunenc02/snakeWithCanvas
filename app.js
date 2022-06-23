let canvas = document.getElementById("gameBoard");
let ctx = canvas.getContext("2d");
let body = document.getElementById("body");

let startX = 100;
let startY = 50;
let endX = 200;
let endY = 50;

let canvasHeight = 450;
let canvasWidth = 800;
var snakeArray = [
    [20, 20, 20, 30],
    [20, 30, 20, 40],
    [20, 40, 20, 50]
];
let timer;
let directionNumber = 0;

let score = 0;
let maxEatenApple = localStorage.getItem("maxEatenApple");
let gameSpeed = 50;

body.addEventListener('keydown', function (e) {


    if (e.key === "r") {
        document.location.reload();
    }
    else if (e.key === "ArrowUp" && (directionNumber !== 1 && directionNumber !== 2 && directionNumber !== 6)) {
        if (directionNumber === 0) {
            directionNumber = 1;
            startGame();
        }

        directionNumber = 1;
    }

    else if (e.key === "ArrowDown" && (directionNumber !== 1 && directionNumber !== 2 && directionNumber !== 6)) {
        if (directionNumber === 0) {
            directionNumber = 2;
            startGame();
        }

        directionNumber = 2;
    }

    else if (e.key === "ArrowLeft" && (directionNumber !== 3 && directionNumber !== 4 && directionNumber !== 6)) {
        if (directionNumber === 0) {
            directionNumber = 3;
            startGame();
        }

        directionNumber = 3;
    }

    else if (e.key === "ArrowRight" && (directionNumber !== 3 && directionNumber !== 4 && directionNumber !== 6)) {
        if (directionNumber === 0) {
            directionNumber = 4;
            startGame();
        }

        directionNumber = 4;
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
    newSegment(firstX, firstY, lastX, lastY);
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
    ctx.fillStyle = "gray"
    ctx.beginPath();
    ctx.moveTo(snakeArray[0][2], snakeArray[0][3]);
    ctx.lineWidth = 10;

    for (let i = 0; i < snakeArray.length; i++) {

        if (Math.abs(prevX - snakeArray[i][0]) < 11 && Math.abs(prevY - snakeArray[i][1]) < 11) {
            ctx.lineTo(snakeArray[i][0], snakeArray[i][1]);
            prevX = snakeArray[i][0];
            prevY = snakeArray[i][1];
        } else {
            ctx.stroke();
            ctx.lineJoin = "round";
            ctx.beginPath();
            ctx.moveTo(snakeArray[i][2], snakeArray[i][3]);
            ctx.lineWidth = 10;
            prevX = snakeArray[i][0];
            prevY = snakeArray[i][1];
        }

    }
    ctx.stroke();
    scoreTable();
    isGameFinished();
}

function randomAppleCreator() {

    centerX = Math.ceil(Math.random() * canvasWidth-20 + 5);
    centerY = Math.ceil(Math.random() * canvasHeight-20 + 5);
    if(snakeLocation(centerX, centerY)){
        randomAppleCreator();
    }

    appleCreator();
}


function canvasPosition() {

    canvas.setAttribute("height", `${canvasHeight}`);
    canvas.setAttribute("width", `${canvasWidth}`);
    canvas.setAttribute("style", "border:1px dotted black");
    canvas.style.top = "20%";
    canvas.style.left = "30%";
    canvas.style.position = "absolute";
    canvas.style.backgroundColor = "green"

    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.color = "red"
    ctx.moveTo(snakeArray[0][0], snakeArray[0][1]);
    ctx.lineTo(snakeArray[0][2], snakeArray[0][3]);
    ctx.lineTo(snakeArray[1][2], snakeArray[1][3]);
    ctx.lineTo(snakeArray[2][2], snakeArray[2][3]);
    ctx.lineWidth = 10;
    ctx.stroke();

    scoreTable();

}

function appleCreator() {

    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI);
    ctx.fill();
}

function newSegment(firstX, firstY, lastX, lastY) {

    let newSegment = [0, 0, 0, 0];
    newSegment[0] = firstX;
    newSegment[1] = firstY;
    newSegment[2] = lastX;
    newSegment[3] = lastY;

    snakeArray.unshift(newSegment);

    if (lastX < 0 || lastX > canvasWidth || lastY < 0 || lastY > canvasHeight) {
        positionFormatter();
    }

}

function startGame() {

    timer = setInterval(decidingCreation, gameSpeed);
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

    if (snakeArray[snakeArray.length - 1][0] - snakeArray[snakeArray.length - 1][2] == 0 &&
        snakeArray[snakeArray.length - 1][3] - snakeArray[snakeArray.length - 1][1] < 0) {

        let newSnakeSegment = [snakeArray[snakeArray.length - 1][0], snakeArray[snakeArray.length - 1][1] + 20,
        snakeArray[snakeArray.length - 1][2], snakeArray[snakeArray.length - 1][3]];
        snakeArray.push(newSnakeSegment);

    }

    else if (snakeArray[snakeArray.length - 1][0] - snakeArray[snakeArray.length - 1][2] == 0 &&
        snakeArray[snakeArray.length - 1][3] - snakeArray[snakeArray.length - 1][1] > 0) {

        let newSnakeSegment = [snakeArray[snakeArray.length - 1][0], snakeArray[snakeArray.length - 1][1] - 20,
        snakeArray[snakeArray.length - 1][2], snakeArray[snakeArray.length - 1][3]];
        snakeArray.push(newSnakeSegment);
    }

    else if (snakeArray[snakeArray.length - 1][0] - snakeArray[snakeArray.length - 1][2] < 0 &&
        snakeArray[snakeArray.length - 1][3] - snakeArray[snakeArray.length - 1][1] == 0) {

        let newSnakeSegment = [snakeArray[snakeArray.length - 1][0] - 20, snakeArray[snakeArray.length - 1][1],
        snakeArray[snakeArray.length - 1][2], snakeArray[snakeArray.length - 1][3]];
        snakeArray.push(newSnakeSegment);
    }

    else if (snakeArray[snakeArray.length - 1][0] - snakeArray[snakeArray.length - 1][2] > 0 &&
        snakeArray[snakeArray.length - 1][3] - snakeArray[snakeArray.length - 1][1] == 0) {

        let newSnakeSegment = [snakeArray[snakeArray.length - 1][0] + 20, snakeArray[snakeArray.length - 1][1] + 10,
        snakeArray[snakeArray.length - 1][2], snakeArray[snakeArray.length - 1][3]];
        snakeArray.push(newSnakeSegment);
    }

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
        lastY = 10;
        firstY = 0;

    }

    else if (snakeArray[0][3] < 0) {
        lastY = canvasHeight - 10;
        firstY = canvasHeight;

    }
    snakeArray.pop();
    newSegment(firstX, firstY, lastX, lastY);
}

window.onload = () => {

    canvasPosition();
    randomAppleCreator();
}

function isGameFinished() {

    snakeHeadX = snakeArray[0][2];
    snakeHeadY = snakeArray[0][3];

    if (snakeLocation(snakeHeadX, snakeHeadY)) {
        clearInterval(timer);
        directionNumber = 0;

        if(maxEatenApple < score) {
            setLocalStorage(score);
        }

        gameOverTable();
        
    }
}

function snakeLocation(locationX, locationY) {

    for (let i = 0; i < snakeArray.length; i++) {
        if (snakeArray[i][0] === locationX && snakeArray[i][1] === locationY) {
            return true;
        }
    }
    return false;
}

function scoreTable(){

    ctx.font = "20px sanserif";
    ctx.textAlign = "left";
    ctx.fillStyle = "brown"
    ctx.fillText(`Score: ${score}`, 20, 30);

    ctx.font = "20px sanserif";
    ctx.textAlign = "right";
    ctx.fillStyle = "brown";
    ctx.fillText(`Max Score: ${maxEatenApple}`, 770, 30);

}

function fasterGame(){

    if(score % 10 === 0){
        gameSpeed /= 2
        clearInterval(timer);
        timer = setInterval(decidingCreation, gameSpeed);
    }

}

function gameOverTable(){

    ctx.font = "100px sanserif";
    ctx.textAlign = "center";
    ctx.fillStyle = "brown"
    ctx.fillText(`GAME OVER`, 400, 225);

    ctx.font = "20px sanserif";
    ctx.textAlign = "center";
    ctx.fillStyle = "brown"
    ctx.fillText(`press R to try again`, 400, 325);

}

function setLocalStorage(score){
    localStorage.setItem("maxEatenApple", `${score}`)
}