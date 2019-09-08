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
		this.sprite = 'ball';
		this.spritePop = 'P';
	}

	update() {
		const { keys } = this.game.input;
		const vel = 7;

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
		this.game.canvas.drawSprite(this.x, this.y, this.sprite);
	}

	respawn(x, y) {
		this.dead = false;
		this.x = this.game.checkpoint.x;
		this.y = this.game.checkpoint.y;
		this.game.canvas.drawSprite(this.x, this.y, this.sprite);
		this.game.canvas.setScroll(this.x);
	}
	
	touchTiles() {
		const tiles = this.getTouchedTiles();
		for (let tile of tiles) {
			// if(tile.tile === 'X') {
			// 	this.isBig = true;
			// }

			if (Tile.isLethal(tile.tile)) {
				this.kill(tile.x, tile.y);
				return;
			}
			
			if (Tile.isPickable(tile.tile)) {
				if (tile.tile === 'D') {
					this.game.score += 500;
					this.game.level.clearTile(tile.x, tile.y, 'C');
					this.game.checkpoint = {x: tile.x, y: tile.y};
				}

				if (tile.tile === 'L') {
					this.game.lives++;
					this.game.score += 1000;
					this.game.level.clearTile(tile.x, tile.y);
				}

				if (tile.tile === 'R' || tile.tile === '+' || tile.tile === 'E' || tile.tile === '-') {
					this.game.score += 250;
					this.game.level.ringsCollected++;
					if (tile.tile === 'R') {
						this.game.level.clearTile(tile.x, tile.y, 'Q');
						this.game.level.clearTile(tile.x, tile.y + Tile.size, '*');
					} else if (tile.tile === '+') {
						this.game.level.clearTile(tile.x, tile.y - Tile.size, 'Q');
						this.game.level.clearTile(tile.x, tile.y, '*');
					} else if (tile.tile === 'E') {
						this.game.level.clearTile(tile.x, tile.y, 'W');
						this.game.level.clearTile(tile.x + Tile.size, tile.y, '*');
					} else if (tile.tile === '-') {
						this.game.level.clearTile(tile.x - Tile.size, tile.y, 'W');
						this.game.level.clearTile(tile.x, tile.y, '*');
					} else {
						return;
					}
				}

				if ((tile.tile === '=' || tile.tile === '$') && this.passedAllRings === true) {
					this.game.score += (1000 + this.game.lives * 500);
					this.game.level.ringsCollected = 0;
					this.passedAllRings = false;
					this.game.levelsCompleted++;
					this.game.nextLevel = true;
				}
				
			}
		}
	}

	kill(i, j) {
		if(!this.dead) {
			this.dead = true;
			this.game.lives--;
			this.respawn(i, j);
		}
	}
}