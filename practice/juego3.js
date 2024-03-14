var configTeclado = { prevent_repeat: true};
//window = clase nativa de js
var eventoTeclado = new window.keypress.Listener(this, configTeclado);

function pulsaA () {
  console.log("Has pulsado la A");
}

function pulsaAB () {
  console.log("Has pulsado la A y B a la vez");
}

function ataqueEspecial () {
  console.log("Has desbloqueado el ataque especial");
}


eventoTeclado.simple_combo('a', pulsaA);
eventoTeclado.simple_combo('a b', pulsaAB);
eventoTeclado.sequence_combo('up down a b', ataqueEspecial);
