(function (root) {
	var SnakeGame = root.SnakeGame = (root.SnakeGame || {});
	
	var View = SnakeGame.View = function ($el) {
		this.$el = $el;
		this.board = new SnakeGame.Board();
		this.snake = this.board.snake;
		this.speed = 300;
		this.score = 0;
		
		this.bindKeys();
		this.renderBoard();
	}
	
	View.prototype.start = function () {
		var view = this;
		this.interval = setInterval(function () { 
			view.step();
		}, this.speed);
	}
	
	View.prototype.step = function () {
		this.snake.move();
		if (this.snake.segments.length <= 20) this.gaugeSpeed();
		if (this.snake.lost) this.stop();
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
					break;
			}
		});
	}
	
	View.prototype.renderBoard = function () {
		this.board.constructBoard();
		var $el = this.$el;
		
		$el.empty();
		$("strong#score").empty();
		$("strong#score").html(this.score);
		
		_.flatten(this.board.grid).forEach(function (space) {
			if (space === "S") {
				$el.append("<li class='snake'>");
			} 
			else if (space === "A") {
				$el.append("<li class='apple'>");
			} 
			else {
				$el.append("<li>");
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
			changeSpeed(200);
		}
		else if (this.snake.segments.length === 20) {
			changeSpeed(150);
		}
	}
	
	View.prototype.stop = function () {
		clearInterval(this.interval);
	}
	
	View.prototype.countScore = function () {
		this.score = (this.snake.segments.length - 1) * 10;
	}
})(this);