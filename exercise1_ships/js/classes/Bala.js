class Bala{
  constructor(x, y, w){
    this.x = x; //posicion incial bala eje x
    this.y = y; //posicion incial bala eje y
    this.w = w; //ancho bala
  }

  dibujar() {
    //Dibujar la bala
    game.ctx.save();
    game.ctx.fillStyle = game.colorBala;
    game.ctx.fillRect(this.x, this.y, this.w, this.w);
    this.y = this.y - 4;
    game.ctx.restore();
  };

  disparar() {
    //los enemigos disparan
    game.ctx.save();
    game.ctx.fillStyle = game.colorBala2;
    game.ctx.fillRect(this.x, this.y, this.w, this.w);
    this.y = this.y + 4;
    game.ctx.restore();
  };
}
