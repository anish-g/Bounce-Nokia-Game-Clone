class Game {
	constructor(containerId, options) {
		this.input;
		this.score;
		this.level;
		this.canvas;
		this.frame = 1;
		this.animator;
		this.lives = 3;
		this.restart = false;
		this.nextLevel = false;
		this.currentLevel = 0;
		this.lastLevel = 1;
		this.options = options;
		this.containerId = containerId;
		this.gameOver = false;
		this.checkpoint = {x: 0, y: 0};
		this.start();
	}

	loop() {
		if (this.update()) {
			this.render();
			this.animator = window.requestAnimationFrame(this.loop.bind(this));
		}
	}

	update() {
		if (this.lives < 0) {
			this.end();
			window.cancelAnimationFrame(this.animator);
			return false;
		}

		if (this.nextLevel) {
			this.currentLevel++;
			if(this.currentLevel > this.lastLevel) {
				this.end();
				window.cancelAnimationFrame(this.animator);
				return false;
			}
		}

		if (this.restart || this.nextLevel) {
			this.restart = false;
			this.nextLevel = false;
			this.level = new Level(this, this.currentLevel);
			this.input.clear();
			this.frame = 1;
		}

		this.input.update();
		this.level.update();
		this.frame++;
		return true;
	}

	render() {
		this.level.draw();
	}

	start() {
		const self = this;
		const startCanvas = document.createElement('canvas');
		const startCtx = startCanvas.getContext('2d');
		const bgImage = new Image();
		bgImage.src = 'assets/bg/bg.jpg';
		const playBtn = new Image();
		playBtn.src = 'assets/tile/menu_button_play.png'
		const container = document.getElementById(self.containerId);
		container.appendChild(startCanvas);

		startCanvas.width = 640;
		startCanvas.height = 360;

		setInterval(drawStartScreen, 500);
		window.addEventListener('click', startScreenEventHandler);

		function drawStartScreen() {
			startCtx.drawImage(bgImage, 0, 0, 640, 360);
			startCtx.drawImage(playBtn, 380, 220, 178, 50);	
		}

		function initGameObjects() {
			self.input = new Input();
			// self.score = new Score(self.containerId, self);
			self.canvas = new Canvas(self.containerId, self.options);
			self.level = new Level(self, self.currentLevel);
		}

		let canvasX = container.offsetLeft - (startCanvas.width / 2);
		let canvasY = container.offsetTop - (startCanvas.height / 2);

		function startScreenEventHandler(e) {
			let xVal = e.pageX - canvasX;
			let yVal = e.pageY - canvasY;

			if (xVal > 380 && xVal < 558 && yVal > 220 && yVal < 270) {
				container.removeChild(startCanvas);
				window.removeEventListener('click', startScreenEventHandler);
				initGameObjects();
				self.loop();
			}
		}
	}

	end() {
		const self = this;
		const endCanvas = document.createElement('canvas');
		const endCtx = endCanvas.getContext('2d');
		const container = document.getElementById(self.containerId);
		container.appendChild(endCanvas);
		
		endCanvas.width = 640;
		endCanvas.height = 360;

		setInterval(drawEndScreen, 500);
		window.addEventListener('click', endScreenEventHandler);

		function drawEndScreen() {
			endCtx.fillStyle = '#51DAFE';
			endCtx.fillRect(0, 0, endCanvas.width, endCanvas.height);
			endCtx.fillStyle = '#fff';
			endCtx.fillRect(80, 45, 480, 270);
			endCtx.fillStyle = '#000';
			endCtx.lineWidth = 8;
			endCtx.strokeRect(80, 45, 480, 270);

			endCtx.font = '50px GameFont';
			endCtx.textAlign = 'center';
			endCtx.fillText('GAME', 200, 180);
			endCtx.fillText('OVER', 200, 226);
		}

		let canvasX = container.offsetLeft - (startCanvas.width / 2);
		let canvasY = container.offsetTop - (startCanvas.height / 2);

		function EndScreenEventHandler(e) {
			let xVal = e.pageX - canvasX;
			let yVal = e.pageY - canvasY;

			// if (xVal > 380 && xVal < 558 && yVal > 220 && yVal < 270) {
			// 	container.removeChild(startCanvas);
			// 	window.removeEventListener('click', startScreenEventHandler);
			// }
		}

	}
}