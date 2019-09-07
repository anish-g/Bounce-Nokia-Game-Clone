class Canvas {
	constructor(containerId, options) {
		this.canvas = document.createElement('canvas');
		this.container = document.getElementById(containerId);
		this.options = options || {};
		this.canvas.width = this.options.width || 640;
		this.canvas.height = this.options.height || 360;
		this.container.appendChild(this.canvas);
		this.ctx = this.canvas.getContext('2d');

		this.view = {
			x:0,
			y:0,
			width: this.canvas.width,
			height: this.canvas.height
		}; 

		this.sprites = {
			ball: new Sprite(99, 1),
			B: new Sprite(891, 1),
			T: new Sprite(806, 1),
			D: new Sprite(141, 1),
			C: new Sprite(183, 1),
			L: new Sprite(349, 1),
			P: new Sprite(58, 1),
			Z: new Sprite(1, 165),
			X: new Sprite(43, 165),
			F: new Sprite(1, 83, 80, 80) 
		};
	}

	setScroll(dx) {
		this.view.x = dx;
	}

	drawTile(tile, i, j) {
		let x = i * Tile.size;
		let y = j * Tile.size;
		
		if (this.sprites[tile]) {

			this.drawSprite(x, y, tile);
			return;
		}

		this.ctx.fillStyle = '#51DAFE';
		// this.ctx.fillStyle = '#000';

		if (tile === '-' || tile === '+') {
			return;
		} else {
			this.ctx.fillRect(x - this.view.x, y - this.view.y, Tile.size, Tile.size);
		}
	}

	drawSprite(x, y, sprite) {
		this.sprites[sprite].draw(this.ctx, x - this.view.x, y - this.view.y);
	}

	clear() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}