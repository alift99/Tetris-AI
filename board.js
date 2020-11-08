const COL = 10;
const ROW = 20;

function Board() {
  this.colors = [];
  for (r = 0; r < ROW; r++) {
    this.colors[r] = [];
    for (c = 0; c < COL; c++) {
      this.colors[r][c] = VACANT;
    }
  }
  this.isMain = false;
  this.gameLost = false;
}

Board.prototype.clone = function () {
  var clone = new Board(ROW, COL);
  for (var r = 0; r < ROW; r++) {
    for (var c = 0; c < COL; c++) {
      clone.colors[r][c] = this.colors[r][c];
    }
  }
  return clone;
};

Board.prototype.draw = function () {
    if(this.isMain){
        for (r = 0; r < ROW; r++) {
            for (c = 0; c < COL; c++) {
              drawSquare(c, r, this.colors[r][c]);
            }
        }
    }
};

Board.prototype.isLine = function(row){
    for(var c = 0; c < COL; c++){
        if (this.colors[row][c] == VACANT){
            return false;
        }
    }
    return true;
};

Board.prototype.lines = function(){
    var count = 0;
    for(var r = 0; r < ROW; r++){
        if (this.isLine(r)){
            count++;
        }
    }
    return count;
};

Board.prototype.columnHeight = function(column){
    var r = 0;
    for(; r < ROW && this.colors[r][column] == VACANT; r++);
    return (ROW - r);
};

Board.prototype.aggregateHeight = function(){
    var total = 0;
    for(var c = 0; c < COL; c++){
        total += this.columnHeight(c);
    }
    return total;
};

Board.prototype.bumpiness = function(){
    var total = 0;
    for(var c = 0; c < COL - 1; c++){
        total += Math.abs(this.columnHeight(c) - this.columnHeight(c+1));
    }
    return total;
};

Board.prototype.holes = function(){
    var count = 0;
    for(var c = 0; c < COL; c++){
        var block = false;
        for(var r = 0; r < ROW; r++){
            if (this.colors[r][c] != VACANT) {
                block = true;
            }else if (this.colors[r][c] == VACANT && block){
                count++;
            }
        }
    }
    return count;
};

Board.prototype.lines = function(){
    var count = 0;
    for(var r = 0; r < ROW; r++){
        if (this.isLine(r)){
            count++;
        }
    }
    return count;
};
