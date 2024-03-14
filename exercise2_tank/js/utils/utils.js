const caratula = () => {
  let imagen = new Image();
  imagen.src = "images/caratula.png";

  imagen.onload = () => {
    game.ctx.drawImage(imagen, 0, 0, 700, 500);
  };
};

const seleccionar = (e) => {
  if (game.caratula) {
    inicio();
  }
};

const inicio = () => {
  // Verifica si el juego ya ha terminado
  if (game.finJuego) return;
  limpiarCanvas();
  game.caratula = false;
  document.addEventListener("mousemove", function (e) {
    let { x, y } = ajustar(e.clientX, e.clientY);
    let dx = x - game.centroX;
    let dy = y - game.centroY;
    game.radianes = Math.atan2(dy, dx);
  });
  game.tanque.dibujarTanque();
  setTimeout(lanzaEnemigo, 500);
  animar();
};

const animar = () => {
  if (game.finJuego) return;
  requestAnimationFrame(animar);
  verificar();
  pintar();
  colisiones();
};

const verificar = () => {
  if (game.finJuego) return;

  if (game.tecla_array[BARRA]) {
    if (game.balas > 0) {
      game.balas_array.push(
        new Bala(
          game.centroX + Math.cos(game.radianes) * 35,
          game.centroY + Math.sin(game.radianes) * 35,
          game.radianes
        )
      );
      //disparo una bala a la vez
      game.balas--;
      game.tecla_array[BARRA] = false;
      sonidos.disparo.play();
    }
  }
};

const pintar = () => {
  if (game.finJuego) return;
  limpiarCanvas();
  game.ctx.save();
  marcador();
  game.ctx.translate(game.centroX, game.centroY);
  game.ctx.scale(game.tanque.escala, game.tanque.escala);
  game.ctx.rotate(game.radianes);
  game.ctx.drawImage(
    game.imagen,
    -game.imagen.width / 2,
    -game.imagen.height / 2
  );
  game.ctx.restore();

  for (let i = 0; i < game.balas_array.length; i++) {
    if (game.balas_array[i] != null) {
      //el array tiene balas
      game.balas_array[i].dibujarBala();
      //elimino la bala cuando sale del canvas
      if (
        game.balas_array[i].x < 0 ||
        game.balas_array[i].x > game.w ||
        game.balas_array[i].y < 0 ||
        game.balas_array[i].y > game.h
      ) {
        game.balas_array[i] = null; //vacio la memoria
      }
    }
  }
  game.enemigos_array.map((enemigo, i) => {
    if (enemigo != null) {
      //hay enemigos en el array
      enemigo.dibujarEnemigo();
    }
  });
};

const ajustar = (xx, yy) => {
  const pos = game.canvas.getBoundingClientRect();
  const x = xx - pos.left;
  const y = yy - pos.top;
  return { x, y };
};

const mensaje = (
  cadena,
  x,
  y,
  funetes = "bold 20px Courier",
  color = "black"
) => {
  let medio = (game.canvas.width - x) / 2;
  game.ctx.save();
  game.ctx.fillStyle = "black";
  game.ctx.strokeStyle = "black";
  game.ctx.textBaseline = "top";
  game.ctx.font = "bold 20px Courier";
  game.ctx.textAlign = "center";
  game.ctx.clearRect(x, y, game.canvas.width, game.canvas.height);
  game.ctx.fillText(cadena, x + medio, y);
  game.ctx.restore();
};

const lanzaEnemigo = () => {
  if (game.finJuego) return;

  let lado = Math.floor(Math.random() * 4) + 1;
  let x, y;
  if (lado == 1) {
    //genero enemigo a la dcha
    x = -10;
    y = Math.floor(Math.random() * game.h);
  } else if (lado == 2) {
    //genero enemigo a la izq
    x = Math.floor(Math.random() * game.w);
    y = -10;
  } else if (lado == 3) {
    x = game.w + Math.random() * 10;
    y = Math.floor(Math.random() * game.h);
  } else if (lado == 4) {
    x = Math.floor(Math.random() * game.w);
    y = game.h + Math.random() * 10;
  }
  game.enemigos_array.push(new Enemigo(x, y));
  setTimeout(lanzaEnemigo, 1000); //genero un enemigo cada 2s
};

const colisiones = () => {
  if (game.finJuego) return;

  game.enemigos_array.map((enemigo, i) => {
    game.balas_array.map((bala, j) => {
      if (enemigo != null && bala != null) {
        if (
          bala.x > enemigo.x &&
          bala.x < enemigo.x + enemigo.w &&
          bala.y > enemigo.y &&
          bala.y < enemigo.y + enemigo.w
        ) {
          game.enemigos_array[i] = null;
          game.balas_array[j] = null;
          game.puntos += 10;
          sonidos.boing.play();
        }
      }
    });
    if (enemigo != null) {
      if (enemigo.n > 95) {
        game.enemigos_array[i] = null;
        game.vidas--;
        sonidos.boom.play();
        if (game.vidas <= 0) gameOver();
      }
    }
  });
};

const gameOver = () => {
  limpiarCanvas();
  console.log("You lost!!");
  game.finJuego = true;
  game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
  game.ctx.textAlign = "center";
  game.balas_array = [];
  game.enemigos_array = [];
  game.finJuego = true;
  sonidos.fin.play();
  mensaje("Game Over!!!", 250, 150, "bold 20px Courier", "black");
  mensaje(`Your score: ${game.puntos}`, 250, 200, "bold 20px Courier", "black");
  mensaje("Try again baby", 250, 250, "bold 20px Courier", "black");
};

const marcador = () => {
  let m = `Score: ${game.puntos} Vidas: ${game.vidas} Balas: ${game.balas}, 10, 20`;
  mensaje(m, 0, 10, "bold 20px Courier", "black");
};

const limpiarCanvas = () => {
  game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
};
