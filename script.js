const grid = document.querySelector('#grid');
let squares = Array.from(document.querySelectorAll('#grid div'));

const grid2 = document.querySelector('#grid2');
let squares2 = Array.from(document.querySelectorAll('#grid2 div'));

const score = document.getElementById("score")
const score2 = document.getElementById("score")

const startBtn = document.getElementById("start-button");
const btnImg = document.getElementById("btnImg")

const width = 10;
var count = 0;
var count2 = 0;

var gOver = false;

// Arrow Buttons
const leftBtn = document.getElementById("left");
const downBtn = document.getElementById("down");
const rightBtn = document.getElementById("right");
const rotateBtn = document.getElementById("rotate");

const leftBtn2 = document.getElementById("left2");
const downBtn2 = document.getElementById("down2");
const rightBtn2 = document.getElementById("right2");
const rotateBtn2 = document.getElementById("rotate2");

// colors 
const color = [
    "#A03EFF",
    "#FF3353",
    "#FFE833",
    "#33FFD1",
    "#15e915"
]


// // Rough code 
// for (i = 0; i < 200; i++) {
//     squares[i].textContent = i;
//     squares2[i].textContent = i;
// }

// shapes 
const lshape = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2]
]


const zshape = [
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width, width + 1, width * 2 + 1, width * 2 + 2],
    [1, width + 1, width, width * 2]
]

const tshape = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1]
]

const oshape = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1]
]

const ishape = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3]
]


const theShapes = [lshape, zshape, tshape, oshape, ishape];

let currentPosition = 4;
let currentRotation = 0;

let currentPosition2 = 4;
let currentRotation2 = 0;


// // Selecting random shape 
let random = Math.floor(Math.random() * theShapes.length);
let currentShape = theShapes[random][currentRotation]

let random2 = Math.floor(Math.random() * theShapes.length);
let currentShape2 = theShapes[random2][currentRotation]


// // draw the shapes 
function draw() {
    currentShape.forEach((index) => {
        squares[currentPosition + index].style.background = color[random];
    })
}
draw();

function draw2() {
    currentShape2.forEach((index) => {
        squares2[currentPosition2 + index].style.background = color[random2];
    })
}
draw2();

// // Erase the shape 
function erase() {
    currentShape.forEach((index) => {
        squares[currentPosition + index].style.background = "none";
    })
}
function erase2() {
    currentShape2.forEach((index) => {
        squares2[currentPosition2 + index].style.background = "none";
    })
}


// // move down 
function moveDown() {
    erase();
    currentPosition += width;
    draw();
    stop();
}
var timer = setInterval(moveDown, 1000);

function moveDown2() {
    erase2();
    currentPosition2 += width;
    draw2();
    stop2();
}
var timer2 = setInterval(moveDown2, 1000);

// // stop the shape 
function stop() {
    if (currentShape.some(index => squares[currentPosition + index + width].classList.contains('freeze'))) {
        currentShape.forEach(index => squares[currentPosition + index].classList.add('freeze'));
        // start a new shape 
        random = Math.floor(Math.random() * theShapes.length);
        currentRotation = 0;
        currentShape = theShapes[random][currentRotation]
        currentPosition = 4;
        draw();
        gameOver();
        addScore();
    }
}
function stop2() {
    if (currentShape2.some(index => squares2[currentPosition2 + index + width].classList.contains('freeze'))) {
        currentShape2.forEach(index => squares2[currentPosition2 + index].classList.add('freeze'));
        // start a new shape 
        random2 = Math.floor(Math.random() * theShapes.length);
        currentRotation2 = 0;
        currentShape2 = theShapes[random2][currentRotation2]
        currentPosition2 = 4;
        draw2();
        gameOver();
        addScore2();
    }
}

// // control the game 
function control(e) {
    if (!gOver) {
        if (e.keyCode === 65 ) {
            moveleft();
        }
        else if (e.keyCode ===68 ) {
            moveRight();
        }
        else if (e.keyCode ===83 ) {
            moveDown();
        }
        else if (e.keyCode ===87) {
            rotate();
        }
    }
}
function control2(e) {
    console.log(e.keyCode);
    if (!gOver) {
        if (e.keyCode === 37) {
            moveleft2();
        }
        else if (e.keyCode === 39) {
            moveRight2();
        }
        else if (e.keyCode === 40) {
            moveDown2();
        }
        else if (e.keyCode === 38) {
            rotate2();
        }
    }
}
window.addEventListener("keydown", control);
window.addEventListener("keydown", control2);

// // Control shapes in phone 
leftBtn.addEventListener("click", moveleft);
rightBtn.addEventListener("click", moveRight);
downBtn.addEventListener("click", moveDown);
rotateBtn.addEventListener("click", rotate);

leftBtn2.addEventListener("click", moveleft2);
rightBtn2.addEventListener("click", moveRight2);
downBtn2.addEventListener("click", moveDown2);
rotateBtn2.addEventListener("click", rotate2);


// // move left 
function moveleft() {
    erase();
    let leftBlockage = currentShape.some(index => (currentPosition + index) % width === 0)
    let Blockage = currentShape.some(index => squares[currentPosition + index - 1].classList.contains('freeze'));
    if (!leftBlockage && !Blockage) {
        currentPosition--;
    }
    draw();
}

function moveleft2() {
    erase2();
    let leftBlockage = currentShape2.some(index => (currentPosition2 + index) % width === 0)
    let Blockage = currentShape2.some(index => squares2[currentPosition2 + index - 1].classList.contains('freeze'));
    if (!leftBlockage && !Blockage) {
        currentPosition2--;
    }
    draw2();
}

// // move right 
function moveRight() {
    erase();

    let RightBlockage = currentShape.some(index => (currentPosition + index) % width === width - 1)
    let Blockage = currentShape.some(index => squares[currentPosition + index + 1].classList.contains('freeze'));
    if (!RightBlockage && !Blockage) {
        currentPosition++;
    }
    draw();
}

function moveRight2() {
    erase2();

    let RightBlockage = currentShape2.some(index => (currentPosition2 + index) % width === width - 1)
    let Blockage = currentShape2.some(index => squares2[currentPosition2 + index + 1].classList.contains('freeze'));
    if (!RightBlockage && !Blockage) {
        currentPosition2++;
    }
    draw2();
}

// // Rotate 
function rotate() {
    erase();
    let RightBlockage = currentShape.some(index => (currentPosition + index) % width === width - 1)
    let leftBlockage = currentShape.some(index => (currentPosition + index) % width === 0)

    if (!leftBlockage && !RightBlockage) {
        currentRotation = (currentRotation + 1) % 4;
    }
    currentShape = theShapes[random][currentRotation];
    draw();
}

function rotate2() {
    erase2();
    let RightBlockage = currentShape2.some(index => (currentPosition2 + index) % width === width - 1)
    let leftBlockage = currentShape2.some(index => (currentPosition2 + index) % width === 0)

    if (!leftBlockage && !RightBlockage) {
        currentRotation2 = (currentRotation2 + 1) % 4;
    }
    currentShape2 = theShapes[random2][currentRotation2];
    draw2();
}

// // Pause Function 
function pause() {
    if (timer || timer2) {
        clearInterval(timer)
        clearInterval(timer2)
        timer = null;
        timer2 = null;
        btnImg.src = "images/play.png";
    }
    else {
        draw();
        draw2();
        timer = setInterval(moveDown, 1000);
        timer2 = setInterval(moveDown2, 1000);
        btnImg.src = "images/pause.png"
    }
}
startBtn.addEventListener("click", pause);

// // game over 
function gameOver() {
    if (currentShape.some(index => squares[currentPosition + index].classList.contains('freeze'))) {
        score.innerHTML = "Game Over";
        clearInterval(timer);
        pause();
        gOver = true;
    }
    if (currentShape2.some(index => squares2[currentPosition2 + index].classList.contains('freeze'))) {
        score2.innerHTML = "Game Over";
        clearInterval(timer2);
        pause();
        gOver = true;
    }
}

// // add score
function addScore() {
    for (let i = 0; i<199; i += width) {
        const row = [i,i+1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9];
        // console.log(row);
        if (row.every(index => squares[index].classList.contains('freeze'))) {
            count += 10;
            score.textContent = `Score : ${count}`
            row.forEach(index => {
                squares[index].classList.remove("freeze");
                squares[index].style.background = '';
            })
            const squareRemoved = squares.splice(i,width);
            console.log(squareRemoved);  
            squares = squareRemoved.concat(squares)
            squares.forEach(square => grid.appendChild(square));
        }
    }
}

function addScore2() {
    for (let i = 0; i<199; i += width) {
        const row = [i,i+1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9];
        // console.log(row);
        if (row.every(index => squares2[index].classList.contains('freeze'))) {
            count2 += 10;
            score2.textContent = `Score : ${count}`
            row.forEach(index => {
                squares2[index].classList.remove("freeze");
                squares2[index].style.background = '';
            })
            const squareRemoved = squares2.splice(i,width);
            console.log(squareRemoved);  
            squares2 = squareRemoved.concat(squares2)
            squares2.forEach(square => grid.appendChild(square));
        }
    }
}