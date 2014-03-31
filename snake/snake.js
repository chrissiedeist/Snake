$(function() {
(function (root) {
  var SnakeGame = root.SnakeGame = (root.SnakeGame || {});

  var Snake = SnakeGame.Snake = function () {
    this.segments = [new Coord([4,5])];
    this.dir = "N";
    this.growth = false;
  };

  var Coord = SnakeGame.Coord = function(pos) {
    this.pos = pos;
  }

  var Apple = SnakeGame.Apple = function(pos) {
    this.pos = pos;
  }

  Apple.randomApple = function(dimX, dimY) {

    var x = Math.floor(Math.random()* dimX);
    var y = Math.floor(Math.random()* dimY);

    return new SnakeGame.Apple([x,y]);
  }

  var Board = SnakeGame.Board = function(dimX, dimY) {
    this.snake = new Snake();
    this.dimX = dimX;
    this.dimY = dimY;
    this.apples = this.generateApples(Board.INITIAL_APPLES);
    this.grid = this.generateGrid();
  }

  Snake.DIR = ["N", "E", "S", "W"];
  Board.INITIAL_APPLES = 20;

  Coord.MOVE_DIFFS = {
    "N": [ -1, 0],
    "E": [ 0,  1],
    "S": [ 1,  0],
    "W": [0,  -1]
  }

  Coord.prototype.plus = function(dir) {
    this.pos = [this.pos[0] + Coord.MOVE_DIFFS[dir][0],
                this.pos[1] + Coord.MOVE_DIFFS[dir][1]];
  }

  Snake.prototype.turn = function(dir) {
    this.dir = dir
  }

  Snake.prototype.move = function() {
    var that = this;

    var head = this.segments[0];
    var newHead = new Coord([head.pos[0], head.pos[1]]);
    newHead.plus(this.dir);

    this.segments.unshift(newHead);
    if (this.growth) {
    } else {
      this.segments.pop();
    }
    this.growth = false;
  }

  Board.prototype.generateGrid = function() {
    this.grid = this.newGrid();
    this.setSnakeOnGrid();
    this.addApplesOnGrid();
  }

  Board.prototype.generateApples = function(numApples) {
    var apples = [];
    var that = this;
    _.times(numApples, function(){
       apples.push(new Apple.randomApple(that.dimX, that.dimY));
    })
    return apples;
  }

  Board.prototype.checkSnake = function() {
    var that = this;
    this.snake.segments.forEach(function(coord){
  		if (coord.pos[0] >= that.dimY){
  			coord.pos[0] = 0;
  		} else if (coord.pos[0] < 0) {
  			coord.pos[0] = that.dimY - 1;
  		}

  		if (coord.pos[1] >= that.dimX){
  			coord.pos[1] = 0;
  		} else if (coord.pos[1] < 0) {
  			coord.pos[1] = that.dimX - 1;
  		}

    });
  }

  Board.prototype.checkForApple = function() {
    var that = this;
    var coord = this.snake.segments[0];
    this.apples.forEach(function(apple, idx) {
      if (coord.pos + "" === apple.pos + "") {
        that.snake.growth = true;
        that.apples.splice(idx, 1);
      }

    });
  }

  Board.prototype.newGrid = function() {
    var that = this;
    var array = [];
    _.times(that.dimX, function (i) {
      array[i] = [];
      _.times(that.dimY, function (j) {
        array[i][j] = null;
      });
    });
    return array;
  }

  Board.prototype.setSnakeOnGrid = function() {
    var that = this;
    this.snake.segments.forEach(function(coord){
      that.grid[coord.pos[0]][coord.pos[1]] = coord;
    });
  }

  Board.prototype.addApplesOnGrid = function() {
    var that = this;
    this.apples.forEach(function(apple){
      that.grid[apple.pos[0]][apple.pos[1]] = apple;
    });
  }

  Board.prototype.render = function() {
    return _.map(this.grid, function(row) {
      return _.map(row, function(cell) {
        if (cell === null) {
          return ".";
        } else if (cell.constructor === SnakeGame.Coord) {
          return "O";
        } else {
          return "X";
        }
      })
    })
  }

})(this);

// this.Snake.Game is a constructor function, so we instantiate a new object, then run it.



});























