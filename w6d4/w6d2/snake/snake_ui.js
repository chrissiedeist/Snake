$(function() {
  (function (root) {
    var SnakeGame = root.SnakeGame = (root.SnakeGame || {});
    var Board = SnakeGame.Board;
    var SnakeUI = SnakeGame.SnakeUI = function() {
      this.$container = $('.container');
    }

    SnakeUI.LETTER_KEYS = {
      87 : "N",
      65 : "W",
      68 : "E",
      83 : "S"
    }

    SnakeUI.prototype.start = function() {
      var that = this;
      this.running = true;
      this.board = new Board(45, 45);

      $('html').keydown(function(event){
        that.handleKeyEvent(event);
      });
      // this.step();
      window.setInterval(that.step.bind(that), 500);
    }

    SnakeUI.prototype.handleKeyEvent = function(event) {
      var code = event.keyCode;

      if (code == 32) {
        this.running = (this.running === true ) ? false : true;
      } else if (!!SnakeUI.LETTER_KEYS[code]) {
        this.board.snake.turn(SnakeUI.LETTER_KEYS[code]);
      }


    }

    SnakeUI.prototype.step = function() {
      if (this.running) {
        this.board.checkSnake();
        this.board.snake.move();
        this.board.generateGrid();
        this.render();
      }
    }
    SnakeUI.prototype.render = function() {
      var that = this;
      that.$container.empty();
      this.board.render().forEach(function(row) {
        var $rowDiv = $("<div></div>");
        $rowDiv.addClass("row");

        row.forEach(function(cell) {
          var $cellDiv = $('<div></div>');
          $cellDiv.addClass("cell ");
          $cellDiv.html(cell);
          $rowDiv.append($cellDiv);
        })
        that.$container.append($rowDiv);
      })
    }
  })(this);

  var game = new this.SnakeGame.SnakeUI();
  game.start();
});
