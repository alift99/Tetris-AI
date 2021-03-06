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
//let ai = new AI(0.41932628516176146,0.35151731899712757,0.6622148692076432,0.5119301788504101);
//let ai = new AI(0.510066, 0.760666, 0.35663, 0.184483); //default
let ai = new AI(0.6457577777662875, 0.4407774298653426, 0.5651677707928751, 0.2632442603983253); //fitness 375
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


// drop the piece every 1sec

let dropStart = Date.now();
let gameOver = false;
function drop(){
    let now = Date.now();
    let delta = now - dropStart;
    if(delta > 10){
        activePiece.moveDown();
        dropStart = Date.now();
    }
    if( !gameOver){
        requestAnimationFrame(drop);
    }
}

drop();
