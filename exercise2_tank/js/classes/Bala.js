class Bala {
  constructor(x, y, radianes) {
    this.x = x;
    this.y = y;
    this.w = 5;
    this.velocidad = 8;
    this.radianes = radianes;
  }

  dibujarBala() {
    game.ctx.save();
    game.ctx.fillStyle = game.colorBala;
    //trazado de la bala en el eje x
    this.x += Math.cos(this.radianes) * this.velocidad;
    //trazado de la bala en el eje y
    this.y += Math.sin(this.radianes) * this.velocidad;
    game.ctx.fillRect(this.x, this.y, this.w, this.w);
    game.ctx.restore();
  }
}
