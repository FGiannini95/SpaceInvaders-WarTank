//defino la imagen de portada del canvas solo cuando recargo
const caratula = () => {
  let imagen = new Image();
  imagen.src = "images/cara.webp";
  imagen.onload = () => {
    game.ctx.drawImage(imagen, 0, 0); //posición esquina superior izq
   

  };
};

const seleccionar = (e) => {
  if (game.caratula) {
    inicio();
  }
};

//empiezo el juego
const inicio = () => {
  //borro cualquier contenido dibujado previamente
  game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
  game.caratula = false;
  game.jugador = new Jugador(0);
  game.x = game.canvas.width / 2;
  game.jugador.dibujar(game.x);
  animar();
 
};

var x = 100;
var y = 100;

const animar = () => {
  if (game.finJuego == false) {
    requestAnimationFrame(animar);
    verificar();
    pintar();
    colisiones();
  }
};

const colisiones = () => {

  let vive = false;
  for(let i = 0; i < game.enemigos_array.length;i++){
    if(game.enemigos_array[i] != null){
      vive = true;
      break;
    }
  }
  if(!vive){
    gameOver();
    return;
  }

  let enemigo, bala;
  //yo disparo
  for (var i = 0; i < game.enemigos_array.length; i++) {
    for (var j = 0; j < game.balas_array.length; j++) {
      enemigo = game.enemigos_array[i];
      bala = game.balas_array[j];

      if (enemigo != null && bala != null) {
        if (
          bala.x > enemigo.x &&
          bala.x < enemigo.x + enemigo.w &&
          bala.y > enemigo.y &&
          bala.y < enemigo.y + enemigo.w
        ) {
          enemigo.vive = false;
          game.enemigos_array[i] = null;
          game.balas_array[j] = null;
          game.disparo = false;
          game.puntos += 10;
          game.boom.play(); //funcion de js para los archivos de audio
        }
      }
    }
  }
  //el enemigo dispara
  for (var j = 0; j < game.balasEnemigas_array.length; j++) {
    bala = game.balasEnemigas_array[j];
    if (bala != null) {
      if (
        bala.x > game.jugador.x &&
        bala.x < game.jugador.x + game.jugador.w &&
        bala.y > game.jugador.y &&
        bala.y < game.jugador.y + game.jugador.h
      ) {
        gameOver();
      }
    }
  }
};

const gameOver = () => {
  console.log("You lost!!");
  game.finJuego = true;
  game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
  game.balas_array = [];
  game.enemigos_array = [];
  game.balasEnemigas_array = [];
  game.finJuego = true;
  game.fin.play();
  mensaje("Game Over!!!", 100, 60);
  mensaje("Your score: " + game.puntos + " points", 220);
  mensaje("Try again baby", 340, 60);
};

const mensaje = (cadena, y, tamano) => {
  let medio = game.canvas.width / 2;
  game.ctx.save();
  game.ctx.fillStyle = "green";
  game.ctx.strokeStyle = "blue";
  game.ctx.textBaseline = "top";
  game.ctx.font = "40px bold Courier";
  game.ctx.textAlign = "center";
  game.ctx.fillText(cadena, medio, y);
  game.ctx.restore();
};

const verificar = () => {
  //si pulso la tecla, actualizo la posición
  if (game.tecla[KEY_RIGHT]) game.x += 10;
  if (game.tecla[KEY_LEFT]) game.x -= 10;

  //limito el movimiento del cañón
  if (game.x > game.canvas.width - 10) game.x = game.canvas.width - 10;
  if (game.x < 0) game.x = 10;

  //disparo
  if (game.tecla[BARRA]) {
    //disparo un golpe a la vez
    if (game.disparo == false) {
      game.balas_array.push(
        new Bala(game.jugador.x + 12, game.jugador.y - 3, 5)
      );
      //disparo un golpe a la vez
      game.tecla[BARRA] = false;
      game.disparoJugador.play();
    }
  }

  //disparo enemigo
  if (Math.random() > 0.96) {
    dispararEnemigo();
  }
};

const dispararEnemigo = () => {
  var ultimos = new Array();
  //bucle hacia atrás
  for (var i = game.enemigos_array.length; i > 0; i--) {
    if (game.enemigos_array[i] != null) {
      //compruebo que el enemigo esté vivo
      ultimos.push(i);
    }
    if (ultimos.length == 18) break;
  }
  //genero de manera aleatoria quien me va a disparar
  d = ultimos[Math.floor(Math.random() * 18)];

  game.balasEnemigas_array.push(
    new Bala(
      game.enemigos_array[d].x + game.enemigos_array[d].w / 2,
      game.enemigos_array[d].y,
      10
    )
  );
};

const pintar = () => {
  game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
  game.jugador.dibujar(game.x);
  score();

  //mover las balas
  for (var i = 0; i < game.balas_array.length; i++) {
    if (game.balas_array[i] != null) {
      game.balas_array[i].dibujar();
      if (game.balas_array[i].y < 0) {
        game.disparo = false;
        game.balas_array[i] = null;
      }
    }
  }

  //Balas Enemigas
  for (var i = 0; i < game.balasEnemigas_array.length; i++) {
    if (game.balasEnemigas_array[i] != null) {
      game.balasEnemigas_array[i].disparar();
      if (game.balasEnemigas_array[i].y > game.canvas.height)
        game.balasEnemigas_array[i] = null;
    }
  }

  //enemigos
  for (var i = 0; i < game.enemigos_array.length; i++) {
    if (game.enemigos_array[i] != null) {
      game.enemigos_array[i].dibujar();
    }
  }
};

const score = () => {
  game.ctx.save();
  game.ctx.fillStyle = "white";
  game.ctx.font = "20px bold Courier";
  game.ctx.fillText("Score: " + game.puntos, 10, 20);
  game.ctx.restore();
};
