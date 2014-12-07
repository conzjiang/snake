(function (root) {
  var SnakeGame = root.SnakeGame = (root.SnakeGame || {});

  var Snake = SnakeGame.Snake = function (board) {
    this.dir = "N";
    this.board = board;
    this.pos = SnakeGame.Board.CENTER;
    this.segments = [this.pos];
    this.lost = false;
  };

  Snake.DELTAS = {
    "N": [-1, 0],
    "E": [0, 1],
    "S": [1, 0],
    "W": [0, -1]
  };

  Snake.prototype.turn = function (newDir) {
    this.dir = newDir;
  };

  Snake.prototype.move = function () {
    var plus = Snake.DELTAS[this.dir];
    this.pos = [this.pos[0] + plus[0], this.pos[1] + plus[1]];
    this.checkMove();
  };

  Snake.prototype.checkMove = function () {
    if (_(this.pos).isEqual(this.board.food.pos)) {
      this.eatFood();
    } else if (!this.board.validPos() || this.hitSelf()) {
      this.lost = true;
    } else {
      this.segments.pop();
      this.segments.unshift(this.pos);
    }
  };

  Snake.prototype.eatFood = function () {
    var food = this.board.food;
    this.segments.unshift(food.pos);
    this.board.food = this.board.generateFood();
  };

  Snake.prototype.hitSelf = function () {
    return this.isSegment(this.segments[0], true);
  };

  Snake.prototype.isSegment = function (pos, hitSelf) {
    var segments = this.segments;
    if (hitSelf) segments = this.segments.slice(1);

    return segments.some(function (snakePos) {
      return _(snakePos).isEqual(pos);
    });
  };
})(this);