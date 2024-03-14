var personaje = function (x, y, nombre) {
  this.x = 0;
  this.y = 0;
  this.nombre = nombre;

  //Metodo desplazaciamiento hacia abajo
  this.abajo = function () {
    this.y += 10;
  }
  //Metodo hablar
  this.hablar = function () {
    console.log("Hola amigo, me llamo " + this.nombre);
  }
}

var personaje1 = new personaje (10, 100, "Federico");
personaje1.x;