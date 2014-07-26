(function (root) {
	var SnakeGame = root.SnakeGame = (root.SnakeGame || {});
	
	var View = SnakeGame.View = function () {
		this.board = new SnakeGame.Board();
		this.snake = this.board.snake;
	}
	
	View.prototype.start = function () {
		this.bindKeys();
		this.board.render();
		
		var view = this;
		this.interval = setInterval(function () { 
			view.step();
		}, 300);
	}
	
	View.prototype.step = function () {
		this.snake.move();
		if (this.snake.lost) this.stop();
		this.board.render();
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
	
	View.prototype.stop = function () {
		clearInterval(this.interval);
	}
})(this);