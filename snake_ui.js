(function (root) {
  var SnakeGame = root.SnakeGame = (root.SnakeGame || {});

  var View = SnakeGame.View = function ($el) {
    this.$el = $el;
    this.board = new SnakeGame.Board();
    this.snake = this.board.snake;
    this.speed = 150;
    this.score = 0;
    this.renderBoard();
  };

  View.prototype.renderBoard = function () {
    var $boardEl = this.$el.find("ul");
    var food = this.board.food.foodClass;

    this.board.constructBoard();
    $boardEl.empty();
    $("strong#score").html(this.score);

    _.flatten(this.board.grid).forEach(function (space) {
      switch(space) {
        case "S":
          $boardEl.append("<li class='snake'>");
          break;
        case "H":
          $boardEl.append("<li class='snake head'>");
          break;
        case "A":
          $boardEl.append("<li class='" + food + "'>");
          break;
        default:
          $boardEl.append("<li>");
          break;
      }
    });
  };

  View.prototype.start = function () {
    this.bindKeys();
    this.interval = setInterval(this.step.bind(this), this.speed);
  };

  View.prototype.bindKeys = function () {
    var snake = this.snake;
    var changeGameState = this.changeGameState;

    $(document).on("keydown", function () {
      event.preventDefault();

      switch(event.which) {
        case 37:
          snake.turn("W");
          break;
        case 38:
          snake.turn("N");
          break;
        case 39:
          snake.turn("E");
          break;
        case 40:
          snake.turn("S");
          break;
        default:
          changeGameState("pause-game");
          break;
      }
    });
  };

  View.prototype.changeGameState = function (gameState) {
    var $gameStatus = this.$el.find(".game-status");
    this.stop();
    $gameStatus.removeClass("start-game").addClass(gameState);
  };

  View.prototype.step = function () {
    this.snake.move();
    if (this.snake.segments.length <= 20) this.gaugeSpeed();
    if (this.snake.lost) this.endGame();
    this.countScore();
    this.renderBoard();
  };

  View.prototype.gaugeSpeed = function () {
    var that = this;
    var changeSpeed = function (newSpeed) {
      that.stop();
      that.speed = newSpeed;
      that.start();
    };

    if (this.snake.segments.length === 10) {
      changeSpeed(125);
    } else if (this.snake.segments.length === 20) {
      changeSpeed(100);
    }
  };

  View.prototype.endGame = function () {
    this.changeGameState("end-game");
  };

  View.prototype.countScore = function () {
    this.score = (this.snake.segments.length - 1) * 10;
  };

  View.prototype.stop = function () {
    clearInterval(this.interval);
    $(document).off("keydown");
  };
})(this);