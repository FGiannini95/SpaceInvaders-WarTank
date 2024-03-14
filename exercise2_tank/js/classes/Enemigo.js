class Enemigo {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.n = 0;
    this.inicioX = x;
    this.inicioY = y;
    this.estado = 1;
    this.r = 10;
    this.w = this.r * 2;
    this.vive = true;
    this.velocidad = .3 + Math.random();
    this.color = game.colorEnemigo[Math.floor(Math.random() * game.colorEnemigo.length)];
  }

  dibujarEnemigo(){
		if (this.n < 100 && this.vive) {
			game.ctx.save();
			game.ctx.beginPath();
			game.ctx.fillStyle = this.color;
			game.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
			game.ctx.fill();
			this.n += this.velocidad;
			this.x = game.centroX * this.n / 100 +
			this.inicioX * (100 - this.n) / 100;
			this.y = game.centroY * this.n / 100 +
				this.inicioY * (100 - this.n) / 100;
			game.ctx.restore();
    }
  }
}