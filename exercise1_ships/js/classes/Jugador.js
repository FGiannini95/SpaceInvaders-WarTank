class Jugador{
  constructor(x, y, w, h){
    this.x = x;
        this.y = 450; //posiicón fija en la parte inferior
        this.w = 30;
        this.h = 15;
  }

  dibujar (x){
    this.x = x;
    //se dibuja la imagan en la posición dada y el ancho establecido
    game.ctx.drawImage(game.imagen, this.x, this.y, this.w, this.h);
  };
}


