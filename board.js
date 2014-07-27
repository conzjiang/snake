(function (root) {
	var SnakeGame = root.SnakeGame = (root.SnakeGame || {});
	
	var Board = SnakeGame.Board = function () {
		this.snake = new SnakeGame.Snake(this);
		this.apple = this.generateApple();
	}
	
	Board.DIMS = 30;
	Board.CENTER = [Board.DIMS / 2, Board.DIMS / 2];
	
	Board.prototype.generateApple = function () {
		var randomPos = function () {
			return [Math.floor(Math.random() * 30), Math.floor(Math.random() * 30)];
		}
		
		var pos = randomPos();
		
		while (this.snake.isSegment(pos)) {
			pos = randomPos();
		}
		
		return { pos: pos };
	}
	
	Board.prototype.constructBoard = function () {
		this.grid = this.createGrid();
		this.placeSnake();
		this.placeApple();
	}
	
	Board.prototype.createGrid = function () {
		var grid = [];

		for (var i = 0; i < Board.DIMS; i++) {
			grid[i] = [];

			for (var j = 0; j < Board.DIMS; j++) {
				grid[i][j] = null;
			}
		}
		
		return grid;
	}
	
	Board.prototype.placeSnake = function () {
		var grid = this.grid;
		
		this.snake.segments.forEach(function (pos) {
			grid[pos[0]][pos[1]] = "S";
		});
	}
	
	Board.prototype.placeApple = function () {
		var pos = this.apple.pos;
		this.grid[pos[0]][pos[1]] = "A";
	}
	
	Board.prototype.validPos = function () {
		return this.snake.pos.every(function (element) {
			return element >= 0 && element < Board.DIMS;
		});
	}
})(this);