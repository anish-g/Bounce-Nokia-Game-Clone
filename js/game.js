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
		this.lastLevel = 4;
		this.options = options;
		this.containerId = containerId;
		this.gameOver = false;
		this.gameWon = false;
		this.score = 0;
		this.checkpoint = {x: 0, y: 0, big: false};
		this.levelsCompleted = 0;
		this.isBig = false;
		this.canBounce = false;
		this.floatUp = true;
		this.inWater = false;
		this.start();
	}

	loop() {
		if (this.update()) {
			this.render();
			this.animator = window.requestAnimationFrame(this.loop.bind(this));
		}
	}

	update() {
		if (this.lives <= 0) {
			this.gameWon = false;
			this.currentLevel = 0;
			this.isBig = false;
			this.end();
			window.cancelAnimationFrame(this.animator);
			return false;
		}

		if (this.nextLevel) {
			this.currentLevel++;
			if(this.currentLevel >= this.lastLevel) {
				this.gameWon = true;
				this.isBig = false;
				this.currentLevel = 0;
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
		const score = this.score;
		const lastLevel = this.lastLevel;
		const levelsCompleted = this.levelsCompleted;
		const gameWon = this.gameWon;
		const self = this;
		const container = document.getElementById(self.containerId);
		const endCanvas = document.createElement('canvas');
		self.canvas.canvas.insertAdjacentElement('afterend', endCanvas);
		const endCtx = endCanvas.getContext('2d');
		const crown = new Image();
		crown.src = 'assets/tile/crown.png';
		const failed = new Image();
		failed.src = 'assets/tile/failed_title.png';
		const yellowstar = new Image();
		yellowstar.src = 'assets/tile/star_yellow.png';
		const greystar = new Image();
		greystar.src = 'assets/tile/star_gray.png';
		const nextBtn = new Image();
		nextBtn.src = 'assets/tile/button_next.png'
		const retryBtn = new Image();
		retryBtn.src = 'assets/tile/button_retry.png'
		
		endCanvas.width = 480;
		endCanvas.height = 270;
		endCanvas.classList.add('game-finished');

		setInterval(drawEndScreen, 500);
		window.addEventListener('click', endScreenEventHandler);

		function drawEndScreen() {
			endCtx.fillStyle = '#fff';
			endCtx.fillRect(0, 0, 480, 270);
			endCtx.fillStyle = '#000';
			endCtx.lineWidth = 10;
			endCtx.strokeRect(0, 0, 480, 270);
			
			endCtx.font = '25px GameFont';
			endCtx.textAlign = 'center';

			if (gameWon) {
				endCtx.drawImage(crown, 60, 60, 120, 60);
				endCtx.fillStyle = 'blue';
				endCtx.fillText('CONGRATULATIONS', 120, 160);
				endCtx.fillText('YOU WON!', 120, 200);
				endCtx.drawImage(nextBtn, 277, 185, 148, 50);
			} else {
				endCtx.drawImage(failed, 60, 30, 120, 100);
				endCtx.fillStyle = 'green';
				endCtx.fillText('NICE TRY', 120, 160);
				endCtx.fillText('YOU LOST!', 120, 200);
				endCtx.drawImage(retryBtn, 277, 185, 148, 50);	
			}

			endCtx.fillStyle = 'red';
			endCtx.textAlign = 'right';
			endCtx.font = '50px GameFont';
			endCtx.fillText(score, 390, 110);

			let starX;
			for (let j = 0; j < levelsCompleted; j++) {
				starX = 295 + (j * 40);
				endCtx.drawImage(yellowstar, starX, 130);		
			}

			for (let i = levelsCompleted; i < lastLevel; i++) {
				starX = 295 + (i * 40);
				endCtx.drawImage(greystar, starX, 130);		
			}
		}

		let canvasX = container.offsetLeft - (endCanvas.width / 2);
		let canvasY = container.offsetTop - (endCanvas.height / 2);

		function endScreenEventHandler(e) {
			let xVal = e.pageX - canvasX;
			let yVal = e.pageY - canvasY;

			if (xVal > 277 && xVal < 425 && yVal > 185 && yVal < 235) {
				self.gameWon = false;
				self.score = 0;
				self.lives = 3;
				self.levelsCompleted = 0;
				self.currentLevel = 0;
				container.removeChild(endCanvas);
				container.removeChild(self.canvas.canvas);
				container.removeChild(self.canvas.gbarCanvas);
				window.removeEventListener('click', endScreenEventHandler);
				self.start();
			}
		}
	}
}