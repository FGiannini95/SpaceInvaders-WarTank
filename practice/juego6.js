var canvas;
var ctx;
var FPS = 50;
var imgMega;

function inicializar() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  //cargamos img
  imgMega = new Image();
  imgMega.src = "img/hombre.png";
  imgMega.width = 100;
  imgMega.height = 100;
  //repito el metodo cada x tiempo
  setInterval(function () {
    principal();
  }, 1000) / FPS;
}

var protagonista = function (x, y) {
  this.x = x;
  this.y = y;
  this.velocidad = 5;

  this.dibujar = function () {
    ctx.drawImage(imgMega, this.x, this.y);
  };

  this.arriba = function () {
    this.y -= this.velocidad;
  };

  this.derecha = function () {
    this.x += this.velocidad;
  };

  this.abajo = function () {
    this.y += this.velocidad;
  };

  this.izquierda = function () {
    this.x -= this.velocidad;
  };
};

var personaje = function (x, y) {
  this.x = x;
  this.y = y;
  this.derecha = true;

  this.dibujar = function () {
    ctx.fillstyle = "#fff000";
    ctx.fillRect(this.x, this.y, 50, 50);
  };

  this.mueve = function (velocidad) {
    if (this.derecha == true) {
      if (this.x < 400) this.x += velocidad;
      else {
        this.derecha = false;
      }
    } else {
      if (this.x > 50) this.x -= velocidad;
      else {
        this.derecha = true;
      }
    }
  };
};

var pers1 = new personaje(10, 50);
var pers2 = new personaje(10, 120);
var pers3 = new personaje(10, 230);
var prota = new protagonista(200, 200);

document.addEventListener("keydown", function (tecla) {
  if (tecla.keyCode == 38) {
    prota.arriba();
  }
  if (tecla.keyCode == 39) {
    prota.derecha();
  }
  if (tecla.keyCode == 40) {
    prota.abajo();
  }
  if (tecla.keyCode == 37) {
    prota.izquierda();
  }
});

function borrarCanvas() {
  canvas.width = 500;
  canvas.height = 400;
}

function principal() {
  borrarCanvas();
  pers1.dibujar();
  pers2.dibujar();
  pers3.dibujar();
  //el parametro entre parentesis indica la velocidad del movimiento
  pers1.mueve(10);
  pers2.mueve(30);
  pers3.mueve(70);

  prota.dibujar();

  console.log("Funcion");
}
