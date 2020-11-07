const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");
const scoreElement = document.getElementById("score");

const SQ = squareSize = 20;
const VACANT = "WHITE"; // color of an empty square

// draw a square
function drawSquare(x,y,color){
    ctx.fillStyle = color;
    ctx.fillRect(x*SQ,y*SQ,SQ,SQ);

    ctx.strokeStyle = "BLACK";
    ctx.strokeRect(x*SQ,y*SQ,SQ,SQ);
}

let board = new Board();
board.isMain = true;
board.draw();
let ai = new AI(0.9427764358621548, 0.25706530487082674, -0.012974774919638865, 0.21194734306073829);
//heightWeight":0.9427764358621548,"linesWeight":0.25706530487082674,"holesWeight":-0.012974774919638865,"bumpinessWeight":0.21194734306073829,

// the pieces and their colors

const PIECES = [
    [Z,"red"],
    [S,"green"],
    [T,"yellow"],
    [O,"blue"],
    [L,"purple"],
    [I,"cyan"],
    [J,"orange"]
];

// generate random pieces

function randomPiece(){
    let r = randomN = Math.floor(Math.random() * PIECES.length) // 0 -> 6
    return new Piece( PIECES[r][0],PIECES[r][1]);
}

let activePiece = randomPiece();
activePiece.mainPiece = true;
activePiece.board = board;

function swapPiece(){
    let temp = activePiece;
    activePiece = heldPiece;
    heldPiece = temp;
}

// CONTROL the piece

document.addEventListener("keydown",CONTROL);

function CONTROL(event){
    if(event.keyCode == 37){
        activePiece.moveLeft();
        dropStart = Date.now();
    }else if(event.keyCode == 38){
        activePiece.rotate();
        dropStart = Date.now();
    }else if(event.keyCode == 39){
        activePiece.moveRight();
        dropStart = Date.now();
    }else if(event.keyCode == 40){
        activePiece.moveDown();
    }
}

// drop the piece every 1sec

let dropStart = Date.now();
let gameOver = false;
function drop(){
    let now = Date.now();
    let delta = now - dropStart;
    if(delta > 2.5){
        activePiece.moveDown();
        dropStart = Date.now();
    }
    if( !gameOver){
        requestAnimationFrame(drop);
    }
}

drop();