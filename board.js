(function (root) {
  var SnakeGame = root.SnakeGame = (root.SnakeGame || {});

  var Board = SnakeGame.Board = function () {
    this.snake = new SnakeGame.Snake(this);
    this.food = this.generateFood();
  };

  Board.DIMS = 20;
  Board.CENTER = [Board.DIMS / 2, Board.DIMS / 2];
  Board.FOODS = ["apple", "banana", "burger", "chicken", "pizza"];

  Board.prototype.generateFood = function () {
    var randomPos = function () {
      return [random(Board.DIMS), random(Board.DIMS)];
    };

    var pos = randomPos();
    while (this.snake.isSegment(pos)) { pos = randomPos(); }

    return {
      pos: pos,
      foodClass: Board.FOODS[random(food.length)]
    };
  };

  Board.prototype.constructBoard = function () {
    this.grid = this.createGrid();
    this.placeSnake();
    this.placeFood();
  };

  Board.prototype.createGrid = function () {
    var grid = [];

    for (var i = 0; i < Board.DIMS; i++) {
      grid[i] = [];

      for (var j = 0; j < Board.DIMS; j++) {
        grid[i][j] = null;
      }
    }

    return grid;
  };

  Board.prototype.placeSnake = function () {
    var grid = this.grid;

    this.snake.segments.forEach(function (pos, index) {
      grid[pos[0]][pos[1]] = (index === 0) ? "H" : "S";
    });
  };

  Board.prototype.placeFood = function () {
    var pos = this.food.pos;
    this.grid[pos[0]][pos[1]] = "A";
  };

  Board.prototype.validPos = function () {
    return this.snake.pos.every(function (element) {
      return element >= 0 && element < Board.DIMS;
    });
  };

  // helper
  function random(max) {
    return Math.floor(Math.random() * max);
  };
})(this);