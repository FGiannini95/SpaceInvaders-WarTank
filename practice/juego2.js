//detecto el código de la tecla que estoy pulsando
document.addEventListener('keydown', function (tecla){
  console.log(tecla.keyCode);
  if(tecla.keyCode === 32){
    console.log("Espacio");
  }
})