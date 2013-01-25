/*
  Jquery Pagination
  
  Author: Carlos Augusto
  Date: 24/01/2013
*/

var jPag = (function(){
  /*String.format*/
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
  
  function jPag(){
  };
  
  jPag.prototype.Init(){
	
  };
  
  /*
  *  Calcula Indice Inicial
  */
  jPag.prototype.calculaIndiceInicial = function(indiceAtual, NumPPag){
    return (indiceAtual-1)*NumPPag;
  };
  
  /*
  *  calculaItemExibido
  */
  jPag.prototype.calculaItemExibido = function(indice, NumPPag){
  
  }
  
  /*
  * Montar Navagação Anterior
  */
  jPag.prototype.montarNavAntes = function(){
	var outputHtml = '';
	
	outputHtml += '<a class="navAntes" href="#">{0}</a>'.format('<<');
	outputHtml += '<a class="navAntes" href="#">{0}</a>'.format('<');
	
	return outputHtml;
  }
  
  /*
  * Montar Navagação Anterior
  */
  jPag.prototype.montarNavDepois = function(){
    var outputHtml = '';
	
	outputHtml += '<a class="navDepois" href="#">{0}</a>'.format('>');
	outputHtml += '<a class="navDepois" href="#">{0}</a>'.format('>>');
	
	return outputHtml;
  } 
  
  /*
  *  Navegação
  */
  jPag.prototype.Navegacao = function(){
    
  }
  
  /*
  *  Montar Paginação
  */
  jPag.prototype.MontarPaginacao = function(seletor){
    var outputHtml, outputNavAntes, outputNavDepois;
	outputNavAntes = '';
	outputHtml = '';
	outputNavDepois = '';
	
	outputNavAntes = this.montarNavAntes();
	outputNavDepois = this.montarNavDepois();
	
	outputHtml = '<table><tr>{0}{1}{2}</tr></table>';	
	
	
	//itemInicial e itemFinal
	var indiceInicial = calculaIndiceInicial(this.indice, this.numPorPag);
	var totalItens = calculaItemExibido(this.indice, this.numPorPag);
	
	for(var i = indiceInicial; i < totalItens;i++){
		$($(seletor)[i]).show();
	}
	
	outputHtml = outputHtml.format(outputNavAntes,outputHtml,outputNavDepois);
	return outputHtml;
  }
  
  /*
  * Paginar
  */
  jPag.prototype.Paginar = function(indice, seletor, options){
	var indice;
    var numPPag, numPNav, navegacao;
    var default_args = {
		'numPorPag'	:	5,
		'numPorNav':	3,
		'navagacao': true
	};
	for(var index in default_args) {
		if(typeof options[index] == "undefined") options[index] = default_args[index];
	}
	if(typeof(indice) == 'undefined') indice =1;
	this.indice = indice;
	this.numPorPag = options['numPorPag'];
	this.numPorNav = options['numPorNav'];
	this;navegacao = options['navagacao'];
	
	//Ocultar todos os itens
	$(seletor).hide();
	
	if(navegacao)
		this.Navegacao();
	
	this.MontarPaginacao(seletor);
  };
  
  return jPag;
})();