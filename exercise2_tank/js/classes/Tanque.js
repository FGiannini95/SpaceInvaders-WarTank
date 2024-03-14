class Tanque {
  constructor(x, y, radio){
    this.x = x;
    this.y = y;
    this.radio = radio;
    this.escala = 1;
    this.rotacion = 0;
    this.w = 0;
    this.h = 0;
  }

  dibujarTanque(){
    game.imagen.src = "images/tanque.png";
    game.imagen.onload = function(){
      this.w = game.imagen.width;
      this.h = game.imagen.height;
      let ww = this.w / 2;
      let hh = this.h / 2;
      game.ctx.drawImage(game.imagen, game.centroX - ww, game.centroY - hh);
    }.bind(this);
  }
}