class Enemigo{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.w = 35;
    this.veces = 0;
    this.dx = 10;
    this.ciclos = 0;
    this.num = 14;
    this.figura = true;
    this.vive = true;
  }

  dibujar () {
    //defino un retraso en la aparción
    if (this.ciclos > 30) {
      if (this.veces > this.num) {
        this.dx *= -1;
        this.veces = 0;
        this.num = 28;
        this.y += 20;
        this.dx = this.dx > 0 ? this.dx++ : this.dx--;
      } else {
        this.x += this.dx;
      }
      this.veces++;
      this.ciclos = 0;
      this.figura = !this.figura;
    } else {
      this.ciclos++;
    }
    //muestro las diferentes figuras
    if (this.figura) {
      game.ctx.drawImage(
        game.imagenEnemigo,
        0,
        0,
        40,
        30,
        this.x,
        this.y,
        35,
        30
      );
    } else {
      game.ctx.drawImage(
        game.imagenEnemigo,
        50,
        0,
        35,
        30,
        this.x,
        this.y,
        35,
        30
      );
    }
  };
}


