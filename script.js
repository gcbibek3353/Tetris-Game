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
for (i = 0; i < 200; i++) {
    squares[i].textContent = i;
    squares2[i].textContent = i;
}

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

const getRandomShape = (currentRotation) => {
    let random = Math.floor(Math.random() * theShapes.length);
    let Shape = theShapes[random][currentRotation];
    return { Shape, random };
}

// // Selecting random shape 
let { Shape: currentShape, random } = getRandomShape(currentRotation)
let { Shape: currentShape2, random: random2 } = getRandomShape(currentRotation2)

const board1State = { squares, currentPosition, currentRotation, currentShape, random };
const board2State = { squares: squares2, currentPosition: currentPosition2, currentRotation: currentRotation2, currentShape: currentShape2, random: random2 };

// // draw the shapes 
function draw(board) {
    const { currentShape, squares, currentPosition, random } = board;
    currentShape.forEach((index) => {
        squares[currentPosition + index].style.background = color[random];
    })
}
draw(board1State);
draw(board2State);

// // // Erase the shape 
function erase(board) {
    const { currentShape, squares, currentPosition } = board;
    currentShape.forEach((index) => {
        squares[currentPosition + index].style.background = "none";
    })
}

// // // move down 
function moveDown() {
    erase(board1State);
    currentPosition += width;
    draw(board1State);
    stop(currentShape, squares, currentPosition, random, currentRotation);
}
// var timer = setInterval(moveDown, 1000);

function moveDown2() {
    erase(board2State);
    currentPosition2 += width;
    draw(board2State);
    stop(currentShape2, squares2, currentPosition2, random2, currentRotation2);
}
// var timer2 = setInterval(moveDown2, 1000);

// // // stop the shape 
// function stop(currentShape,squares,currentPosition,random,currentRotation) {
//     if (currentShape.some(index => squares[currentPosition + index + width].classList.contains('freeze'))) {
//         currentShape.forEach(index => squares[currentPosition + index].classList.add('freeze'));
//         // start a new shape 
//         random = Math.floor(Math.random() * theShapes.length);
//         currentRotation = 0;
//         currentShape = theShapes[random][currentRotation]
//         currentPosition = 4;
//         draw(board1State);
//         gameOver();
//         addScore(squares,count,score)//make this available for both
//     }
// }

// // // control the game 
function control(e) {
    if (!gOver) {
        if (e.keyCode === 65) {
            moveleft(board1State);
        }
        else if (e.keyCode === 68) {
            moveRight(board1State);
        }
        else if (e.keyCode === 83) {
            moveDown(board1State);
        }
        else if (e.keyCode === 87) {
            rotate(board1State);
        }
    }
}
function control2(e) {
    if (!gOver) {
        if (e.keyCode === 37) {
            moveleft(board2State);
        }
        else if (e.keyCode === 39) {
            moveRight(board2State);
        }
        else if (e.keyCode === 40) {
            moveDown2();
        }
        else if (e.keyCode === 38) {
            rotate(board2State);
        }
    }
}
window.addEventListener("keydown", control);
window.addEventListener("keydown", control2);

// // // Control shapes in phone 
leftBtn.addEventListener("click", () => moveleft(board1State));
rightBtn.addEventListener("click", () => moveRightmoveleft(board1State));
downBtn.addEventListener("click", moveDown);
rotateBtn.addEventListener("click", () => rotatemoveleft(board1State));

leftBtn2.addEventListener("click", () => moveleft(board2State));
rightBtn2.addEventListener("click", () => moveRight(board2State));
downBtn2.addEventListener("click", moveDown2);
rotateBtn2.addEventListener("click", () => rotate(board2State));


// // move left 
function moveleft(board) {
    let { currentShape, squares, currentPosition, random } = board
    console.log('Before left move called');
    console.log(`
        currentShape : ${currentShape}
        currentPosition : ${currentPosition}
        random : ${random}
        `);
    erase(board1State);
    let leftBlockage = currentShape.some(index => (currentPosition + index) % width === 0);
    let Blockage = currentShape.some(index => squares[currentPosition + index - 1].classList.contains('freeze'));
    if (!leftBlockage && !Blockage) {
        currentPosition--;
    }
    draw(board1State);
    console.log('After left move called');
    console.log(`
            currentShape : ${currentShape}
            currentPosition : ${currentPosition}
            random : ${random}
            `);
    console.log(globalThis.currentShape);
}

// // move right 
function moveRight(board) {
    let { currentShape, squares, currentPosition, random } = board;
    erase(board1State);

    let RightBlockage = currentShape.some(index => (currentPosition + index) % width === width - 1)
    let Blockage = currentShape.some(index => squares[currentPosition + index + 1].classList.contains('freeze'));
    if (!RightBlockage && !Blockage) {
        currentPosition++;
    }
    draw(board1State);
}

// // Rotate 
function rotate(board) {
    let { currentShape, squares, currentPosition, random } = board;
    erase(board1State);
    let RightBlockage = currentShape.some(index => (currentPosition + index) % width === width - 1)
    let leftBlockage = currentShape.some(index => (currentPosition + index) % width === 0)

    if (!leftBlockage && !RightBlockage) {
        currentRotation = (currentRotation + 1) % 4;
    }
    currentShape = theShapes[random][currentRotation];
    draw(board1State);
}

// // // Pause Function
// function pause() {
//     if (timer || timer2) {
//         clearInterval(timer)
//         clearInterval(timer2)
//         timer = null;
//         timer2 = null;
//         btnImg.src = "images/play.png";
//     }
//     else {
//         draw(board1State);
//         draw(board2State);
//         timer = setInterval(moveDown, 1000);
//         timer2 = setInterval(moveDown2, 1000);
//         btnImg.src = "images/pause.png"
//     }
// }
// startBtn.addEventListener("click", pause);

// // // game over
// function gameOver() {
//     if (currentShape.some(index => squares[currentPosition + index].classList.contains('freeze'))) {
//         score.innerHTML = "Game Over";
//         clearInterval(timer);
//         console.log('game over for 1 ');
//         pause();
//         gOver = true;
//     }
//     if (currentShape2.some(index => squares2[currentPosition2 + index].classList.contains('freeze'))) {
//         score2.innerHTML = "Game Over";
//         console.log('game over for 1 ');
//         clearInterval(timer2);
//         pause();
//         gOver = true;
//     }
// }

// // // add score
// function addScore(squares,count,score) {
//     for (let i = 0; i < 199; i += width) {
//         const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9];
//         // console.log(row);
//         if (row.every(index => squares[index].classList.contains('freeze'))) {
//             count += 10;
//             score.textContent = `Score : ${count}`
//             row.forEach(index => {
//                 squares[index].classList.remove("freeze");
//                 squares[index].style.background = '';
//             })
//             const squareRemoved = squares.splice(i, width);
//             console.log(squareRemoved);
//             squares = squareRemoved.concat(squares)
//             squares.forEach(square => grid.appendChild(square));
//         }
//     }
// }
