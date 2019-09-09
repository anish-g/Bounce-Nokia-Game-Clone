class Enemy extends Entity {
	constructor(game, x, y) {
		super(game, x, y);
		this.width = Tile.size * 2;
		this.height = Tile.size * 2;
		this.sprite = 'throne';
		this.vel = 1;
		this.direction = 1;
		this.orgY = this.y;
		this.destY = (this.y + Tile.size * 4);
	}

	move() {
		if (this.y < this.destY && this.direction === 1) {
			this.y += this.vel;
			if (this.y === this.destY) 
				this.direction = 0;
		} else if (this.y > this.orgY && this.direction === 0) {
			this.y -= this.vel;
			if (this.y === this.orgY)
				this.direction = 1;
		}
	}

	update() {
		this.move();
		for (let i = 0; i < this.game.level.entities.length; i++) {
			let entity = this.game.level.entities[i];
			if (entity instanceof Player) {
				if (this.hasCollided(entity)) {
					entity.kill();
					return;
				}
			}
		}
	}

	draw() {
		this.game.canvas.drawSprite(this.x, this.y, this.sprite);
	}
}