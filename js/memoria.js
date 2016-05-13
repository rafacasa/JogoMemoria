//https://xanadu1010.wordpress.com/2013/03/09/usando-javascript-para-pegar-valores-enviados-a-pagina-html-via-get/
		function _GET(name)
		{
		  var url   = window.location.search.replace("?", "");
		  var itens = url.split("&");

		  for(n in itens)
		  {
		    if( itens[n].match(name) )
		    {
		      return decodeURIComponent(itens[n].replace(name+"=", ""));
		    }
		  }
		  return null;
		}

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
						 "img/q06.jpg", "img/r06.jpg",
						 "img/q07.jpg", "img/r07.jpg",
						 "img/q08.jpg", "img/r08.jpg",
						 "img/q09.jpg", "img/r09.jpg",
						 "img/q10.jpg", "img/r10.jpg",
						 "img/q11.jpg", "img/r11.jpg",
						 "img/q12.jpg", "img/r12.jpg",
						 "img/q13.jpg", "img/r13.jpg",
						 "img/q14.jpg", "img/r14.jpg",
						 "img/q15.jpg", "img/r15.jpg",
						 "img/q16.jpg", "img/r16.jpg",
						 "img/q17.jpg", "img/r17.jpg",
						 "img/q18.jpg", "img/r18.jpg"];
			return shuffle(array);
		}

		function checkFimDeJogo() {
			if(acertosP1 + acertosP2 === 18) {

			}
		}

		function acerto(posicao1, posicao2) {
			var nome1 = "but" + posicao1;
			var nome2 = "but" + posicao2;
			document.getElementById(nome1).disabled = "disabled";
			document.getElementById(nome2).disabled = "disabled";
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

		function clique(posicao) {
			qtdCliques++;
			var nome = "img" + posicao;
			document.getElementById(nome).src = arrayImagens[posicao];
			if(qtdCliques % 2 === 0) {
				//http://www.pinceladasdaweb.com.br/blog/2009/09/01/os-temporizadores-do-javascript/
				setTimeout(function () {
					responder(aberto, posicao);
				}, 2000);
			} else {
				aberto = posicao;
			}
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
		}
		//http://tutsmais.com.br/blog/javascript-2/metodos-funcoes-javascript-number-array-string-regexp/#sumario