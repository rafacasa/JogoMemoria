function ganhador() {
	var nomeGanhador = _GET("ganhador");
	if(nomeGanhador !== "empate") {
		document.getElementById("ganhador").innerHTML = nomeGanhador;
	} else {
		document.getElementById("p").innerHTML = "O Jogo empatou";
	}
}
