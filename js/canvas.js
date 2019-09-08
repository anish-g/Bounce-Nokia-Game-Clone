class Canvas {
	constructor(containerId, options) {
		this.canvas = document.createElement('canvas');
		this.container = document.getElementById(containerId);
		this.options = options || {};
		this.canvas.width = this.options.width || 640;
		this.canvas.height = this.options.height || 360;
		this.container.appendChild(this.canvas);
		this.ctx = this.canvas.getContext('2d');

		this.gbarLife = new Image();
		this.gbarLife.src = 'assets/tile/gbar_life.png'
		this.gbarRing = new Image();
		this.gbarRing.src = 'assets/tile/gbar_ring.png'

		this.gbarCanvas = document.createElement('canvas');
		this.canvas.insertAdjacentElement('afterend', this.gbarCanvas);
		this.gbarCtx = this.gbarCanvas.getContext('2d');
		this.gbarCanvas.width = 630;
		this.gbarCanvas.height = 40;
		this.gbarCanvas.classList.add('gbar');
		
		this.view = {
			x:0,
			y:0,
			width: this.canvas.width,
			height: this.canvas.height
		}; 

		this.sprites = {
			ball: new Sprite(99, 1), //small ball
			B: new Sprite(891, 1), //red wall block
			T: new Sprite(806, 1),  //throne
			D: new Sprite(141, 1), //diamond checkpoint
			C: new Sprite(183, 1), //arrow checkpoint
			L: new Sprite(349, 1), //life
			P: new Sprite(57, 1), //pop ball died
			Z: new Sprite(1, 165), //slanting block right
			X: new Sprite(43, 165), //slanting clock left
			G: new Sprite(1, 83, 80, 80), //gate closed
			'=': new Sprite(802, 83, 80, 80), //gate opened
			R: new Sprite(765, 1, 40, 80), //ring vertical
			E: new Sprite(683, 1, 80, 40), //ring horizontal
			Q: new Sprite(641, 1, 40, 80), //ring collected vertical
			W: new Sprite(559, 1, 80, 40) //ring collected horizontal
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

		if (tile === '-' || tile === '+' || tile === '#' || tile === '*' || tile === '$') {
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