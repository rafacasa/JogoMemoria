function frame() {
	var codigo = _GET("url");
	if(codigo === null) {
		document.getElementById("frame").src = "inicio.html";
	} else {
		document.getElementById("frame").src = codigo;	
	}
}