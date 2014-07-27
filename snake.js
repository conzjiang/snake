(function (root) {
	var SnakeGame = root.SnakeGame = (root.SnakeGame || {});
	
	var Snake = SnakeGame.Snake = function (board) {
		this.dir = "N";
		this.board = board;
		this.pos = SnakeGame.Board.CENTER;
		this.segments = [this.pos];
		this.lost = false;
	}
	
	Snake.DELTAS = {
		"N": [-1, 0],
		"E": [0, 1],
		"S": [1, 0],
		"W": [0, -1]
	}
	
	Snake.prototype.move = function () {
		var plus = Snake.DELTAS[this.dir];
		this.pos = [this.pos[0] + plus[0], this.pos[1] + plus[1]];
		this.checkMove();
	}
	
	Snake.prototype.turn = function (newDir) {
		this.dir = newDir;
	}
	
	Snake.prototype.checkMove = function () {
		if (_(this.pos).isEqual(this.board.apple.pos)) {
			this.eatApple();
		}
		else if (!this.board.validPos() || this.hitSelf()) {
			this.lost = true;
		}
		else {
			this.segments.pop();
			this.segments.unshift(this.pos);
		}
	}
	
	Snake.prototype.eatApple = function () {
		var apple = this.board.apple;
		this.segments.unshift(apple.pos);
		this.board.apple = this.board.generateApple();
	}
	
	Snake.prototype.hitSelf = function () {
		return this.isSegment(this.segments[0], true);
	}
	
	Snake.prototype.isSegment = function (pos, hitSelf) {
		var isSeg = false;
		var segments = this.segments;
		if (hitSelf) segments = this.segments.slice(1);
		
		segments.forEach(function (snakePos) {
			if (_(pos).isEqual(snakePos)) {
				isSeg = true;
				return true;
			}
		});
		
		return isSeg;
	}
})(this);