let canvas = document.getElementById("gameBoard");
let ctx = canvas.getContext("2d");
let body = document.getElementById("body");

let playableCanvasHeightStart = 50;
let playableCanvasHeight = 450
let canvasHeight = 500;
let canvasWidth = 950;
var snakeArray = [
    [50, 200, 50, 250, 2],
    [50, 150, 50, 200, 2],
    [50, 100, 50, 150, 2]
];

var blocks = [];
let centerX = 0;
let centerY = 0;
let timer;
let directionNumber = 0;
let maxEatenApple;
let score = 0;
let gameSpeed = 2000;
let isDirectionSelectable = true;
let sthEaten = false;
let nextDirection = 2;

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
    nextDirection = directionNumber;
});

function decidingCreation() {

    let firstX;
    let firstY;
    let lastX;
    let lastY;


    firstX = snakeArray[0][2];
    firstY = snakeArray[0][3];
    lastX = snakeArray[0][2];
    lastY = snakeArray[0][3];

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
    console.log(centerX, centerY);
    newSegment(firstX, firstY, lastX, lastY, directionNumber);
    snakeDrawer();
}

function snakeDrawer() {

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    let img = document.getElementById("canvasBackground");
    ctx.drawImage(img, 0, 0);
    sthEaten = false;
    if (isAppleEaten()) {
        randomAppleCreator();
        blockCreator();
        fasterGame();

        if(score % 5 === 0){
            randomBlockCreator();
        }
        
    } else {
        appleCreator();
        blockCreator();
    }

    snakeArray.pop();
   
    isGameFinished();
    addingSnakeSprite();
    scoreTable();


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

    let frame = document.getElementById("frame");

    frame.style.top = "50%";
    frame.style.left = "50%";
    frame.style.transform = "translate(-50%, -50%)";
    frame.style.position = "absolute";

    canvas.setAttribute("height", `${canvasHeight}`);
    canvas.setAttribute("width", `${canvasWidth}`);
    canvas.setAttribute("style", "border:5px solid black");

    canvas.style.top = "50%";
    canvas.style.left = "50%";
    canvas.style.transform = "translate(-50%, -50%)"
    canvas.style.position = "absolute";

    let img = document.getElementById("canvasBackground");
    ctx.drawImage(img, 0, 0);

    ctx.beginPath();

    ctx.lineJoin = "round";
    ctx.lineWidth = 10;
    addingSnakeSprite();
    scoreTable();
    ctx.closePath();

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

    if (snakeArray[0][2] - centerX > 0 && snakeArray[0][2] - centerX < 57 && snakeArray[0][3] - centerY > 0 && snakeArray[0][3] - centerY < 62) {
        score++;
        sthEaten = true;
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
    let lastY = snakeArray[0][3];

    if (snakeArray[0][2] > canvasWidth) {
        lastX = 0;
        firstX = -50;

    }

    else if (snakeArray[0][2] < 0) {
        lastX = canvasWidth;
        firstX = canvasWidth + 50;

    }

    else if (snakeArray[0][3] > canvasHeight) {
        lastY = playableCanvasHeightStart ;
        firstY = playableCanvasHeightStart - 50;

    }

    else if (snakeArray[0][3] < playableCanvasHeightStart) {
        lastY = canvasHeight;
        firstY = canvasHeight + 50;

    }
    snakeArray.shift();
    newSegment(firstX, firstY, lastX, lastY, snakeArray[0][4]);
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

    if (difference === 0) {
        for (let i = 1; i < snakeArray.length; i++) {
            if ((snakeArray[i][2] === locationX && snakeArray[i][3] === locationY)) {
                sthEaten = true;
                return true; 
            }
        }

        for(let i = 0; i < blocks.length; i++) {
            if(locationX - blocks[i][0] <= 50 && locationX - blocks[i][0] >= -10 &&
             locationY - blocks[i][1] <= 50 && locationY - blocks[i][1] >= -10 ){
                sthEaten = true;
                return true;
             }                  
        }

        return false;
    }

    else {
        for (let i = 0; i < snakeArray.length; i++) {
            if (Math.sqrt(Math.pow(Math.abs(snakeArray[i][0] - locationX),2)+ Math.pow(Math.abs(snakeArray[i][1] - locationY), 2)) < difference) {
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

    ctx.font = "18px sanserif";
    ctx.textAlign = "left";
    ctx.fillStyle = "brown"
    ctx.fillText(`Score: ${score}`, 20, 20);

    ctx.font = "18px sanserif";
    ctx.textAlign = "right";
    ctx.fillStyle = "brown";
    ctx.fillText(`Max Score: ${maxEatenApple}`, canvasWidth - 30, 20);

    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.moveTo(0, 27);
    ctx.lineTo(1075, 27);
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

function addingSnakeSprite() {

    let img = document.getElementById("snakeSprite");
    nextDirection = snakeArray[snakeArray.length - 2][4];

    for (let i = snakeArray.length - 1; 0 <= i; i--) {
        if(i === snakeArray.length - 1){
            console.log(snakeArray[i][4], snakeArray[i-1][4]);
        }

        let cutPositionX = 50;
        let cutPositionY = 0;
        let longX = 50;
        let longY = 50;
        let degree = 0;
        let snakeCoordinateX = -25;
        let snakeCoordinateY = -25;

        if (i > 0) {
            nextDirection = snakeArray[i - 1][4];
        }

        if (i === 0) {
            cutPositionX = 0;
            if(sthEaten){
                cutPositionX = 250;
            }
        }
        else if (i === snakeArray.length - 1) {
            cutPositionX = 100;
        }
        else if (nextDirection !== snakeArray[i][4]) {
            cutPositionX = 150;
        }

        ctx.save();

            ctx.translate(snakeArray[i][2] , snakeArray[i][3]);


        if (nextDirection === snakeArray[i][4] || i === 0) {

            if (snakeArray[i][4] === 1) {

                degree = 270 * Math.PI / 180;
                ctx.rotate(degree);
                nextDirection = snakeArray[i][4];
            }
            else if (snakeArray[i][4] === 2) {
                degree = 90 * Math.PI / 180;
                ctx.rotate(degree);
                nextDirection = snakeArray[i][4];
            }
            else if (snakeArray[i][4] === 3) {

                degree = Math.PI;
                ctx.rotate(degree);
                nextDirection = snakeArray[i][4];
            }
            else {
                nextDirection = 4;
            }

        }
        else if(i === snakeArray.length -1){

            if(nextDirection === 4){
                nextDirection = snakeArray[i][4];
            }
            else if (nextDirection === 3) {
                degree = Math.PI;
                ctx.rotate(degree);
                nextDirection = snakeArray[i][4];
            }
            else if(nextDirection === 2) {
                degree = 90 * Math.PI / 180;
                ctx.rotate(degree);
                nextDirection = snakeArray[i][4];
            }
            else {
                degree = 270 * Math.PI / 180;
                ctx.rotate(degree);
                nextDirection = snakeArray[i][4];
            }
        } 
        else {

            if ((snakeArray[i][4] === 1 && nextDirection === 4) || (nextDirection === 2 && snakeArray[i][4] === 3)) {
                
                nextDirection = snakeArray[i][4];

            }
            else if ((snakeArray[i][4] === 1 && nextDirection === 3) || (nextDirection === 2 && snakeArray[i][4] === 4)) {

                degree = 90 * Math.PI / 180;
                ctx.rotate(degree);
                nextDirection = snakeArray[i][4];
            }
            else if ((snakeArray[i][4] === 2 && nextDirection === 4) || (nextDirection === 1 && snakeArray[i][4] === 3)) {

                degree = 270 * Math.PI / 180;
                ctx.rotate(degree);
                nextDirection = snakeArray[i][4];

            }
            else if ((snakeArray[i][4] === 2 && nextDirection === 3) || (nextDirection === 1 && snakeArray[i][4] === 4)) {

                degree = Math.PI;
                ctx.rotate(degree);
                nextDirection = snakeArray[i][4];

            }
        }

        ctx.drawImage(img, cutPositionX, cutPositionY, 50, 50, snakeCoordinateX, snakeCoordinateY, longX, longY);
        ctx.restore();
    }
}

function  randomBlockCreator() {
    
    let numberX = Math.ceil(Math.random() * (canvasWidth - 60));
    let numberY = Math.ceil(Math.random() * (playableCanvasHeight - 60));
    
    numberY += playableCanvasHeightStart;
    if (snakeLocation(numberX, numberY, 75) && 
    Math.abs(centerX - numberX) > 60  && Math.abs(centerY - numberY) > 60 ) {
        blocks.push([numberX,numberY]);
        blockCreator();
    } else {
        randomBlockCreator();
    }
}

function blockCreator() {

    let img = document.getElementById("environment");

    for(let i = 0; i< blocks.length; i++){
        ctx.drawImage(img, 100, 0, 50, 50, blocks[i][0], blocks[i][1], 50, 50);
    }
}

function startGame() {

    timer = setInterval(decidingCreation, gameSpeed);
}

window.onload = () => {

    canvasPosition();
    randomAppleCreator();
    randomBlockCreator();
}

