(function (root) {
  var SnakeGame = root.SnakeGame = (root.SnakeGame || {});

  var View = SnakeGame.View = function ($el) {
    this.$el = $el;
    this.board = new SnakeGame.Board();
    this.snake = this.board.snake;
    this.speed = 200;
    this.score = 0;
    this.renderBoard();
  }

  View.prototype.start = function () {
    this.bindKeys();

    var view = this;
    this.interval = setInterval(function () {
      view.step();
    }, this.speed);
  }

  View.prototype.step = function () {
    this.snake.move();
    if (this.snake.segments.length <= 20) this.gaugeSpeed();
    if (this.snake.lost) this.endGame();
    this.countScore();
    this.renderBoard();
  }

  View.prototype.bindKeys = function () {
    var snake = this.snake;
    var view = this;

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
          view.stop();
          var $gameStatus = view.$el.find(".game-status");
          $gameStatus.removeClass("start-game");
          $gameStatus.addClass("pause-game");
          break;
      }
    });
  }

  View.prototype.gaugeSpeed = function () {
    var view = this;
    var changeSpeed = function (newSpeed) {
      view.stop();
      view.speed = newSpeed;
      view.start();
    }

    if (this.snake.segments.length === 10) {
      changeSpeed(150);
    }
    else if (this.snake.segments.length === 20) {
      changeSpeed(125);
    }
  }

  View.prototype.countScore = function () {
    this.score = (this.snake.segments.length - 1) * 10;
  }

  View.prototype.stop = function () {
    clearInterval(this.interval);
    $(document).unbind("keydown");
  }

  View.prototype.endGame = function () {
    this.stop();
    var $section = this.$el.find(".game-status");
    $section.removeClass("start-game");
    $section.addClass("end-game");
  }

  View.prototype.renderBoard = function () {
    this.board.constructBoard();
    var $el = this.$el.find("ul");
    var food = this.board.food.foodClass;

    $el.empty();
    $("strong#score").html(this.score);

    _.flatten(this.board.grid).forEach(function (space) {
      if (space === "S") {
        $el.append("<li class='snake'>");
      }
      else if (space === "H") {
        $el.append("<li class='snake head'>");
      }
      else if (space === "A") {
        $el.append("<li class='" + food + "'>");
      }
      else {
        $el.append("<li>");
      }
    });
  }
})(this);