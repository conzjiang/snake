(function (root) {
	var SnakeGame = root.SnakeGame = (root.SnakeGame || {});
	
	var Board = SnakeGame.Board = function () {
		this.snake = new SnakeGame.Snake(this);
		this.apple = this.generateApple();
		this.constructBoard();
	}
	
	Board.DIMS = 30;
	Board.CENTER = [Board.DIMS / 2, Board.DIMS / 2];
	
	Board.prototype.generateApple = function () {
		var randomPos = function () {
			return [Math.floor(Math.random() * 30), Math.floor(Math.random() * 30)];
		}
		
		var pos = randomPos();
		
		if (this.grid) {
			while (this.grid[pos[0]][pos[1]] === "S") {
				pos = randomPos();
			}
		}
		else {
			while (_(pos).isEqual(Board.CENTER)) {
				pos = randomPos();
			}
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
	
	Board.prototype.render = function () {
		this.constructBoard();
		
		var board = this;
		$("ul").empty();
		
		this.grid.forEach(function (row) {
			row.forEach(function (space) {
				if (space === "S") {
					$("ul").append("<li class='snake'>");
				} 
				else if (space === "A") {
					$("ul").append("<li class='apple'>");
				} 
				else {
					$("ul").append("<li>");
				}
			});
		});
	}
	
	Board.prototype.validPos = function () {
		return this.snake.pos[0] >= 0 && this.snake.pos[1] >= 0 && 
					 this.snake.pos[0] < 30 && this.snake.pos[1] < 30;
	}
})(this);