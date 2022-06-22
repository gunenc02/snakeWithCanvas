let canvas = document.getElementById("gameBoard");
let ctx = canvas.getContext("2d");
let body = document.getElementById("body");

let startX = 100;
let startY = 50;
let endX = 200;
let endY = 50;

let canvasHeight = 300;
let canvasWidth = 1200;

let snake = [[20, 20, 20, 30]]
let directionNumber = 0;

body.addEventListener('keydown', function (e) {

    if (e.key === "ArrowUp" && (directionNumber !== 1 && directionNumber !== 2)) {
        if(directionNumber === 0){
            directionNumber = 1;
            startGame();
        }

        directionNumber = 1;
    }

    else if (e.key === "ArrowDown" && (directionNumber !== 1 && directionNumber !== 2)) {
        if(directionNumber === 0){
            directionNumber = 2;
            startGame();
        }

        directionNumber = 2;
    }

    else if (e.key === "ArrowLeft" && (directionNumber !== 3 && directionNumber !== 4)) {
        if(directionNumber === 0){
            directionNumber = 3;
            startGame();
        }

        directionNumber = 3;
    }

    else if (e.key === "ArrowRight" && (directionNumber !== 3 && directionNumber !== 4)) {  
        if(directionNumber === 0){
            directionNumber = 4;
            startGame();
        }

        directionNumber = 4;            
    }
    decidingCreation();

});

function decidingCreation(){
    console.log(snake[0][2]);
    let firstX = snake[0][2];
    let firstY = snake[0][3];
    let lastX = snake[0][2];
    let lastY = snake[0][3];

    if(directionNumber === 1) {
        lastY -= 10; 
    }

    else if(directionNumber === 2) {
        lastY += 10;
    }

    else if( directionNumber === 3) {
        lastX -= 10;
    }

    else {
        lastX += 10;
    }
    newSegment(firstX, firstY, lastX, lastY);
    snakeDrawer();
}

function snakeDrawer() {

    ctx.clearRect(0, 0, 1200, 300);
    if (isAppleEaten()) {
        randomAppleCreator();
    } else {
        appleCreator();
    }

    snake.pop();

    for (let i = 0; i < snake.length; i++) {
        console.log("entered");
        ctx.lineJoin = "round";
        ctx.beginPath();
        ctx.moveTo(snake[i][0], snake[i][1]);
        ctx.lineTo(snake[i][2], snake[i][3]);
        ctx.lineWidth = 10;
        ctx.stroke();
    }
}

function randomAppleCreator() {
   
    centerX = Math.ceil(Math.random() * 1280 + 10);
    centerY = Math.ceil(Math.random() * 280 + 10);

    appleCreator();
}    
    

function canvasPosition() {

    canvas.setAttribute("height", `${canvasHeight}`);
    canvas.setAttribute("width", `${canvasWidth}`);
    canvas.setAttribute("style", "border:1px dotted black");
    canvas.style.top = "200px";
    canvas.style.left = "50px";
    canvas.style.position = "relative";

    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(snake[0][0], snake[0][1]);
    ctx.lineTo(snake[0][2], snake[0][3]);
    ctx.lineWidth = 10;
    ctx.stroke();
}

function appleCreator() {

    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI);
    ctx.fill();
}

function newSegment(firstX, firstY, lastX, lastY) {
    if(lastX < 0 || lastX > 1200 || lastY < 0 || lastY > 300 ){    
        positionFormatter();
    }
    let newSegment = [0, 0, 0, 0];
    newSegment[0] = firstX;
    newSegment[1] = firstY;
    newSegment[2] = lastX;
    newSegment[3] = lastY;

    snake.unshift(newSegment);
    snakeDrawer();
}

function startGame() {

    setInterval(decidingCreation, 200);
}

function isAppleEaten() {
    console.log("ım working isAppleEaten")
    if (Math.abs(snake[0][2] - centerX) < 5 && Math.abs(snake[0][3] - centerY) < 5) {
        grow();
        return true;
    }

    return false;
}

function grow() {
    console.log("ım working grow")
    if (snake[snake.length - 1][0] - snake[snake.length - 1][2] == 0 &&
         snake[snake.length - 1][3] - snake[snake.length - 1][1] < 0) {

        let newSnakeSegment = [snake[snake.length - 1][0], snake[snake.length-1][1] + 20,
        snake[snake.length-1][2], snake[snake.length-1][3]] ;
        snake.push(newSnakeSegment);

    }

    else if (snake[snake.length - 1][0] - snake[snake.length - 1][2] == 0 &&
         snake[snake.length - 1][3] - snake[snake.length - 1][1] > 0) {

        let newSnakeSegment = [snake[snake.length - 1][0], snake[snake.length-1][1] - 20,
        snake[snake.length-1][2], snake[snake.length-1][3]] ;
        snake.push(newSnakeSegment);
    }

    else if (snake[snake.length - 1][0] - snake[snake.length - 1][2] < 0 &&
         snake[snake.length - 1][3] - snake[snake.length - 1][1] == 0) {

        let newSnakeSegment = [snake[snake.length - 1][0] - 20, snake[snake.length-1][1],
        snake[snake.length-1][2], snake[snake.length-1][3]] ;        
        snake.push(newSnakeSegment);
    }

    else if (snake[snake.length - 1][0] - snake[snake.length - 1][2] > 0 &&
         snake[snake.length - 1][3] - snake[snake.length - 1][1] == 0) {

        let newSnakeSegment = [snake[snake.length - 1][0] + 20, snake[snake.length-1][1] + 10,
        snake[snake.length-1][2], snake[snake.length-1][3]] ;
        snake.push(newSnakeSegment);
    }
    randomAppleCreator();
}

function positionFormatter() {
    
    if (snake[0][2] > 1200) {
        snake[0][2] = snake[0][2] % 1200;
        snake[0][0] = snake[0][0] % 1200;
        
    }

    else if (snake[0][2] < 0) {
        snake[0][2] += 1200;
        snake[0][0] += 1200;
        
    }

    else if (snake[0][3] > 300) {
        snake[0][3] = snake[0][3] % 300;
        snake[0][1] = snake[0][1] % 300;
        
    }

    else if (snake[0][3] < 0) {
        snake[0][3] += 300;
        snake[0][1] += 300;
        
    }
    newSegment(snake[0][0], snake[0][1], snake[0][2], snake[0][3]);
}

canvasPosition();
randomAppleCreator();


