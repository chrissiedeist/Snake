$(function() {
(function (root) {
  var SnakeGame = root.SnakeGame = (root.SnakeGame || {});

  var Snake = SnakeGame.Snake = function () {
    this.segments = [new Coord([0,0])];
    this.dir = "S";
  };

  var Coord = SnakeGame.Coord = function(pos) {
    this.pos = pos;
  }

  var Apple = SnakeGame.Apple = function(pos) {
    this.pos = pos
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
  // this.apples = this.generateApples();
  }

  Snake.DIR = ["N", "E", "S", "W"];
  Board.INITIAL_APPLES = 20;

  Coord.MOVE_DIFFS = {
    "N": [ -1, 0],
    "E": [ 0,  1],
    "S": [ 1,  0],
    "W": [0,  -1]
  }
  // Coord.OPP_DIFFS = {
  //   "S": [ -1, 0],
  //   "W": [ 0,  1],
  //   "N": [ 1,  0],
  //   "E": [0,  -1]
  // }

  Coord.prototype.plus = function(dir) {
    this.pos = [this.pos[0] + Coord.MOVE_DIFFS[dir][0],
                this.pos[1] + Coord.MOVE_DIFFS[dir][1]];
  }


  Snake.prototype.turn = function(dir) {
    this.dir = dir
  }

  Snake.prototype.move = function() {
    var that = this;

    this.segments.forEach(function(segment){
      segment.plus(that.dir);
    })
  }

  Snake.prototype.grow = function() {
    var tail = this.segments[this.segments.length - 1];
    new_coord = new Coord(tail.pos[0], tail.pos[1]);
    new_coord.plus(Coord.OPP_DIFFS[this.dir]);
    this.segments.push(new_coord);
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
  		if (coord.pos[0] > that.dimY){
  			coord.pos[0] = 0;
  		} else if (coord.pos[0] < 0) {
  			coord.pos[0] = that.dimY;
  		}

  		if (coord.pos[1] > that.dimX){
  			coord.pos[1] = 0;
  		} else if (coord.pos[1] < 0) {
  			coord.pos[1] = that.dimX;
  		}
      // var potentialApple = that.grid[coord.pos[0]][coord.pos[1]]
  //
  //     if (potentialApple.constructor === SnakeGame.Apple) {
  //       that.ateApple(coord);
  //     }
    });
  }

  Board.prototype.ateApple = function(coord) {
    var that = this;

    this.apples.forEach(function(apple, idx) {
      if (coord.pos === apple.pos) {
        that.apples = that.apples.splice(idx, 1);
      }
    });
    this.snake.grow();
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
          return "S";
        } else {
          return "A";
        }
      })
    })
  }

})(this);

// this.Snake.Game is a constructor function, so we instantiate a new object, then run it.



});























