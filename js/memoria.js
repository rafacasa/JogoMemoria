var arrayImagens;
var nomePlayer1;
var nomePlayer2;
var vezPlayer1;
var qtdCliques;
var aberto;
var acertosP1;
var acertosP2;

//http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;
	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
		}
	return array;
}

function atualizaNomes() {
	document.getElementById("nomeP1").innerHTML = nomePlayer1;
	document.getElementById("nomeP2").innerHTML = nomePlayer2;
}

function atualizaPlacar() {
	document.getElementById("placarP1").innerHTML = acertosP1.toString();
	document.getElementById("placarP2").innerHTML = acertosP2.toString();
}

function atualizaVezDeJogador() {
	if(vezPlayer1) {
		document.getElementById("nomeP1").style.color = "#FF0000";
		document.getElementById("placarP1").style.color = "#FF0000";
		document.getElementById("nomeP2").style.color = "#000000";
		document.getElementById("placarP2").style.color = "#000000";
	} else {
		document.getElementById("nomeP2").style.color = "#FF0000";
		document.getElementById("placarP2").style.color = "#FF0000";
		document.getElementById("nomeP1").style.color = "#000000";
		document.getElementById("placarP1").style.color = "#000000";
	}
}

function getArrayImagens() {
	var array = ["img/q01.jpg", "img/r01.jpg",
		"img/q02.jpg", "img/r02.jpg",
		"img/q03.jpg", "img/r03.jpg",
		"img/q04.jpg", "img/r04.jpg", 
		"img/q05.jpg", "img/r05.jpg",
		"img/q06.jpeg", "img/r06.jpg",
		"img/q07.jpg", "img/r07.jpg",
		"img/q08.jpg", "img/r08.jpg",
		"img/q09.JPG", "img/r09.jpg",
		"img/q10.jpg", "img/r10.jpg",];
	return shuffle(array);
}

function redirecionar(ganhador) {
	var url = "final.html?ganhador=" + ganhador;
	location.href=url;
}

function checkFimDeJogo() {
	if(acertosP1 + acertosP2 === 10) {
		if(acertosP1 > acertosP2) {
			redirecionar(nomePlayer1);
		} else if (acertosP2 > acertosP1) {
			redirecionar(nomePlayer2);
		} else {
			redirecionar("empate");
		}
	}
}

//http://stackoverflow.com/questions/2155737/remove-css-class-from-element-with-javascript-no-jquery
function acerto(posicao1, posicao2) {
	var nome1 = "but" + posicao1;
	var nome2 = "but" + posicao2;
	document.getElementById(nome1).classList.remove("oculto");
	document.getElementById(nome2).classList.remove("oculto");
	if(vezPlayer1) {
		acertosP1++;
	} else {
		acertosP2++;
	}
	atualizaPlacar();
	checkFimDeJogo();
}

function responder(posicao1, posicao2) {
	var imagem1 = arrayImagens[posicao1];
	var imagem2 = arrayImagens[posicao2];
	if(imagem1.charAt(4) !== imagem2.charAt(4)) {
		var numero1 = imagem1.substring(5, 7);
		var numero2 = imagem2.substring(5, 7);
		if(numero1 === numero2) {
			acerto(posicao1, posicao2);
			return true;
		}
	}
	var nome1 = "img" + posicao1;
	var nome2 = "img" + posicao2;
	document.getElementById(nome1).src = "img/oculto.jpg";
	document.getElementById(nome2).src = "img/oculto.jpg";
	vezPlayer1 = !vezPlayer1;
	atualizaVezDeJogador();
	return false;
}

//http://stackoverflow.com/questions/22754315/foreach-loop-for-htmlcollection-elements
function bloquearBotoes() {
	var elementos = document.getElementsByClassName("oculto");
	(Array.from(elementos)).forEach(function(elemento) {
		elemento.disabled = true;
	});
}

function desbloquearBotoes() {
	var elementos = document.getElementsByClassName("oculto");
	(Array.from(elementos)).forEach(function(elemento) {
		elemento.removeAttribute("disabled");
	});
}

function clique(posicao) {
	qtdCliques++;
	var nome = "img" + posicao;
	document.getElementById(nome).src = arrayImagens[posicao];
	if(qtdCliques % 2 === 0) {
		bloquearBotoes();
		//http://www.pinceladasdaweb.com.br/blog/2009/09/01/os-temporizadores-do-javascript/
		setTimeout(function () {
			responder(aberto, posicao);
			desbloquearBotoes();
		}, 2000);
	} else {
		aberto = posicao;
		document.getElementById("but"+posicao).disabled = true;
	}
}

function mostrarTodas() {
	var i;
	var nome;
	for(i = 0; i < 20; i++){
		nome = "img" + i;
		document.getElementById(nome).src = arrayImagens[i];
	}		
}

function fecharTodas() {
	var elementos = document.getElementsByClassName("imagem");
	(Array.from(elementos)).forEach(function(elemento) {
		elemento.src = "img/oculto.jpg";
	});
}

function prepare() {
	arrayImagens = getArrayImagens();
	nomePlayer1 = _GET("1player");
	nomePlayer2 = _GET("2player");
	vezPlayer1 = true;
	qtdCliques = 0;
	aberto = null;
	acertosP1 = 0;
	acertosP2 = 0;
	atualizaNomes();
	atualizaPlacar();
	atualizaVezDeJogador();
	bloquearBotoes();
	mostrarTodas();
	setTimeout(function() {
		fecharTodas();
		desbloquearBotoes();
	}, 3000);
}
//http://tutsmais.com.br/blog/javascript-2/metodos-funcoes-javascript-number-array-string-regexp/#sumario
