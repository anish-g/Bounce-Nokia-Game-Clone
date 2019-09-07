class Level {
	constructor(game, n) {
		this.game = game;
		this.map = new LevelMap(n);
		this.tiles = [];
		this.entities = [];
		this.player = new Player(this.game, this.map.player);
		this.entities.push(this.player);
		if (this.map.enemies) {
      		for (let enemy of this.map.enemies) {
        		this.entities.push(new Enemy(this.game, enemy.x * Tile.size, enemy.y * Tile.size));
      		}
    	}
	}

	getCoords(x, y) {
		const i = Math.floor(x / Tile.size);
		const j = Math.floor(y / Tile.size);
		return [i, j];
	}

	inBounds(i, j) {
		if (i < 0 || i >= this.map.tiles[0].length)
			return false;
		
		if (j < 0 || j >= this.map.tiles.length)
			return false;

		return true;
	}

	getTile(x, y) {
		const [i, j] = this.getCoords(x, y);

		if (!this.inBounds(i, j))
			return ' ';

		return this.map.tiles[j][i];
	}

	clearTile(x, y) {
		const [i, j] = this.getCoords(x, y);

		if (this.inBounds(i, j)) {
			const line = this.map.tiles[j];
			this.map.tiles[j] = line.slice(0, +(i - 1) + 1 || undefined) + ' ' + line.slice(i + 1);
		}
	}

	update() {
		this.entities.map(entity => entity.update());
	}
	
	draw() {
		let playerX = Math.floor(this.player.x);
		let dx;
		if(playerX <= 297){
			dx = 0;
		}
		else if(playerX >= (Tile.size * this.map.tiles[0].length - 342)) {
			dx = Tile.size * this.map.tiles[0].length - 640;
		}
		else{
			dx = this.player.x - 297;
		}

		this.game.canvas.setScroll(dx);
		
		for (let j = 0; j < this.map.tiles.length; j++) {
			const line = this.map.tiles[j];
			for (let i = 0; i < line.length; i++) {
				const tile = line[i];
				this.drawTile(tile, i, j);
			}
		}

		for (let entity of this.entities) {
			if (entity.dead) {
				let index = this.entities.indexOf(entity);
				this.entities.splice(index, 1);
			}
		}

		this.entities.map(entity => entity.draw());
	}

	drawTile(tile, i, j) {
		this.game.canvas.drawTile(tile, i, j);
	}
}