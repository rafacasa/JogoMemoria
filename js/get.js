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
