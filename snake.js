(function (root) {
	var SnakeGame = root.SnakeGame = (root.SnakeGame || {});
	
	var Snake = SnakeGame.Snake = function (board) {
		this.dir = "N";
		this.board = board;
		this.pos = SnakeGame.Board.CENTER;
		this.segments = [this.pos];
		this.lost = false;
	}
	
	Snake.prototype.move = function () {
		var plus;
		
		switch(this.dir) {
			case "N":
				plus = [-1, 0];
				break;
			case "E":
				plus = [0, 1];
				break;
			case "S":
				plus = [1, 0];
				break;
			case "W":
				plus = [0, -1];
				break;
		}
		
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
		var hit = false;
		var head = this.segments[0];
		
		this.segments.slice(1).forEach(function (pos) {
			if (_(head).isEqual(pos)) { hit = true; return true; }
		});
		
		return hit;
	}
})(this);