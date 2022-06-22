let canvas = document.getElementById("gameBoard");
let ctx = canvas.getContext("2d");
let body = document.getElementById("body");

let startX = 100;
let startY = 50;
let endX = 200;
let endY = 50;

let canvasHeight = 600;
let canvasWidth = 300;

let snake = [[10, 10, 10, 100]]
let directionNumber = 0;

body.addEventListener('keydown', function (e) {

    if (directionNumber === 0) {
        //startGame();
    }

    if (e.key === "ArrowUp" && (directionNumber !== 1 && directionNumber !== 2)) {
        if (directionNumber !== 0) {
            newSegment(snake[0][2], snake[0][3], snake[0][2], snake[0][3] - 5);
            positionFormatter();
            snakeDrawer();
        } else {

            directionNumber = 1;
            snake[snake.length - 1][1] = snake[snake.length - 1][2] - 5;
            snake[0][3] = snake[0][3] - 5;
            positionFormatter();
            snakeDrawer();
        }
    }

    else if (e.key === "ArrowDown" && (directionNumber !== 1 && directionNumber !== 2)) {
        if (directionNumber !== 0) {
            newSegment(snake[0][2], snake[0][3], snake[0][2], snake[0][3] + 5);
            positionFormatter();
            snakeDrawer();
        } else {

            directionNumber = 2;
            snake[snake.length - 1][1] = snake[snake.length - 1][1] + 5;
            snake[0][3] = snake[0][3] + 5;
            positionFormatter();
            snakeDrawer();
        }
    }

    else if (e.key === "ArrowLeft" && (directionNumber !== 3 && directionNumber !== 4)) {
        if (directionNumber !== 0) {
            newSegment(snake[0][2], snake[0][3], snake[0][2] - 5, snake[0][3]);
            positionFormatter();
            snakeDrawer();

        } else {
            directionNumber = 3;
            snake[snake.length - 1][0] = snake[snake.length - 1][0] - 5;
            snake[0][2] = snake[0][2] - 5;

        }
    }

    else if (e.key === "ArrowRight" && (directionNumber !== 3 && directionNumber !== 4)) {
        if (directionNumber !== 0) {
            newSegment(snake[0][2], snake[0][3], snake[0][2] + 5, snake[0][3]);
            positionFormatter();
            snakeDrawer();
        } else {

            directionNumber = 4;
            snake[snake.length - 1][0] = snake[snake.length - 1][0] + 5;
            snake[0][2] = snake[0][2] + 5;
            positionFormatter();
            snakeDrawer();
        }
    }
});

function snakeDrawer() {

    ctx.clearRect(0, 0, 300, 600);
    console.log("ım working drawer entry")
    if (isAppleEaten()) {
        randomAppleCreator();
    } else {
        appleCreator();
    }


    for (let i = 0; i < snake.length; i++) {
        console.log("entered");
        ctx.lineJoin = "round";
        ctx.beginPath();
        ctx.moveTo(snake[i][0], snake[i][1]);
        ctx.lineTo(snake[i][2], snake[i][3]);
        ctx.lineWidth = 5;
        ctx.stroke();
    }
}

function randomAppleCreator() {

    centerX = Math.ceil(Math.random() * 290 + 5);
    centerY = Math.ceil(Math.random() * 590 + 5);
    appleCreator();
}

function canvasPosition() {

    canvas.setAttribute("height", `${canvasHeight}`);
    canvas.setAttribute("width", `${canvasWidth}`);
    canvas.setAttribute("style", "border:1px dotted black");
    canvas.style.top = "200px";
    canvas.style.left = "700px";
    canvas.style.position = "absolute";
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

    snake.unshift(newSegment);
}

/*function startGame() {

    setInterval(snakeDrawer, 100);
}*/

function isAppleEaten() {
    console.log("ım working isAppleEaten")
    if (snake[0][2] - centerX < 3 && snake[0][3] - centerY) {
        grow();
        return true;
    }

    return false;
}

function grow() {
    console.log("ım working grow")
    if (snake[snake.length - 1][0] - snake[snake.length - 1][2] == 0 && snake[snake.length - 1][3] - snake[snake.length - 1][1] < 0) {
        snake[snake.length - 1][1] += 10;
    }

    else if (snake[snake.length - 1][0] - snake[snake.length - 1][2] == 0 && snake[snake.length - 1][3] - snake[snake.length - 1][1] > 0) {
        snake[snake.length - 1][1] -= 10;
    }

    else if (snake[snake.length - 1][0] - snake[snake.length - 1][2] < 0 && snake[snake.length - 1][3] - snake[snake.length - 1][1] == 0) {
        snake[snake.length - 1][0] -= 10;
    }

    else if (snake[snake.length - 1][0] - snake[snake.length - 1][2] > 0 && snake[snake.length - 1][3] - snake[snake.length - 1][1] == 0) {
        snake[snake.length - 1][0] += 10;
    }
}

function positionFormatter() {
    console.log("ım working positionFormatter")
    if (snake[0][2] > 300) {
        snake[0][2] = snake[0][2] % 300;
        newSegment();
    }

    else if (snake[0][2] < 0) {
        snake[0][2] += 300;
        newSegment();
    }

    else if (snake[0][3] > 300) {
        snake[0][3] = snake[0][3] % 300;
        newSegment();
    }

    else if (snake[0][3] < 0) {
        snake[0][3] += 300;
        newSegment();
    }

}

canvasPosition();
randomAppleCreator();
snakeDrawer();
