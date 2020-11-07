function AI(heightWeight, linesWeight, holesWeight, bumpinessWeight){
    this.heightWeight = heightWeight;
    this.linesWeight = linesWeight;
    this.holesWeight = holesWeight;
    this.bumpinessWeight = bumpinessWeight;
};

AI.prototype._best = function(board, piece){
    var best = null;
    var bestScore = null;
    var bestBoard = null;
    console.log("Entering AI loop");
    for(var rotation = 0; rotation < 4; rotation++){
        console.log("Rotation loop");
        var _piece = piece.clone();
        var _board = board.clone();
        _piece.board = _board;
        for(var i = 0; i < rotation; i++){
            _piece.rotate();
        }

        while(_piece.moveLeft());
        
        while(!_piece.collision(1,0,_piece.activeTetromino)){
            console.log("moved right");
            var _pieceSet = _piece.clone();
            var _board2 = board.clone();
            _pieceSet.board = _board2;
            while(_pieceSet.moveDown());

            var score = null;
            score = -this.heightWeight * _board2.aggregateHeight() - this.holesWeight * _board2.holes() - this.bumpinessWeight * _board2.bumpiness() + this.linesWeight * _board2.lines();
            // score = Math.random();
            if(_board2.gameLost){
                score -= 1000;
            }
            console.log(score);
            if (score > bestScore || bestScore == null){
                bestScore = score;
                best = _piece.clone();
                bestBoard = _board2;
            }

            _piece.x++;
        }
        var _pieceSet = _piece.clone();
        var _board2 = board.clone();
        _pieceSet.board = _board2;
        while(_pieceSet.moveDown());

        var score = null;
        score = -this.heightWeight * _board2.aggregateHeight() - this.holesWeight * _board2.holes() - this.bumpinessWeight * _board2.bumpiness() + this.linesWeight * _board2.lines();
        // score = Math.random();
        console.log(score);
        console.table(bestBoard.colors);
        if (score > bestScore || bestScore == null){
            bestScore = score;
            best = _piece.clone();
        }
    }
    return best;
};

AI.prototype.best = function(grid, piece){
    return this._best(grid, piece);
};