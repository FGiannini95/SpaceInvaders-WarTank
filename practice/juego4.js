var miCanvas;

function inicializar () {
  miCanvas = document.getElementById("canvas");
  //cuando cliqueo con el ratón, quiero ejecutar la función
  miCanvas.addEventListener('mousedown', clickRaton, false);
  //cuando suelto el ratón, quiero ejecutar la función
  miCanvas.addEventListener('mouseup', sueltaRaton, false);
  miCanvas.addEventListener('mousemove', posicionRaton, false);
}

function clickRaton (e) {
  console.log("Pulsando ratón");
}

function sueltaRaton (e) {
  console.log("Soltando ratón");
}

function posicionRaton (e) {
  var x = e.pageX;
  var y = e.pageY;
  console.log("X: " + x + "-Y: " + y);
}