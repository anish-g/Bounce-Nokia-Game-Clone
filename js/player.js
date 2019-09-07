class Player extends Entity {
	constructor(game, position) {
		super(game, position.x * Tile.size, position.y * Tile.size);
		this.width = Tile.size;
		this.height = Tile.size;
		this.direction = 1;
		this.velY = 0;
		this.isJumping = false;
		this.t = 0;
		this.dead = false;
		this.isBig = false;
		this.passedAllRings = false;
	}

	update() {
		const { keys } = this.game.input;
		const vel = 4.4;

		if(keys.up.hold) {
			if(!this.isJumping && this.canJump()) {
				this.t = 5;
          		this.isJumping = true;
          		this.velY = vel;
          		this.jumpGoal = this.y - 4.4 * Tile.size;
			}
		}

		if (!this.isJumping && !this.canJump()) {
			this.y += this.velY;
			this.velY += 0.2;
			
			if(this.velY >= vel) {
				this.velY = vel;
			}

			this.adjustFall();
		}

		if (this.isJumping) {
			this.y -= this.velY;
			this.velY -= 0.01;
			
			if(this.y <= this.jumpGoal) {
				this.y = this.jumpGoal;
				this.isJumping = false;
				this.velY = 0;
			}

			this.adjustJump();
		}

		if(keys.right.hold) {
			this.x += vel;
			this.direction = -1;
			this.adjustWalk('right');
		}

		if(keys.left.hold) {
			this.x -= vel;
			this.direction = -1;
			this.adjustWalk('left');
		}

		this.touchTiles();
	}

	canJump() {
		this.y++;
		const ret = this.clipped('down');
		this.y--;
		return ret;
	}

	adjustWalk(direction) {
		if(this.clipped(direction)) {
			if(direction === 'left') {
				this.x += this.width - 1;
			}
			this.x = Tile.size * Math.floor(this.x / Tile.size);
			if(direction === 'right') {
				return (this.x += Tile.size - this.width);
			}
		} else {
			if(this.canJump()) {
				this.t++;
			}
		}
	}

	adjustJump() {
		if(this.clipped('up')) {
			this.y += Tile.size;
			this.y = Tile.size * Math.floor(this.y / Tile.size);
			this.isJumping = false;
			this.velY = 0;
		}
	}

	adjustFall() {
		if(this.clipped('down')) {
			this.y = Tile.size * Math.floor(this.y / Tile.size);
		}
	}

	draw() {
		let sprite = 'ball';
		this.game.canvas.drawSprite(this.x, this.y, sprite);
	}

	touchTiles() {
		const tiles = this.getTouchedTiles();
		for (let tile of tiles) {
			// if(tile.tile === 'X') {
			// 	this.isBig = true;
			// }

			if (Tile.isLethal(tile.tile)) {
				this.kill();
			}
		}
	}

	kill() {
		if(!this.dead) {
			this.dead = true;
			this.game.lives--;
			this.game.restart = true;
		}
	}
}