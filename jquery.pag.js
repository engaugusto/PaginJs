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
  
  /*
  * Construtor
  */
  function jPag(options){
    var default_args = {
		'numPorPag'	:	5,
		'numPorNav':	3,
		'navagacao': false
	};
	
	if(typeof(options) !== "undefined"){
		for(var index in default_args) {
			if(typeof options[index] == "undefined") options[index] = default_args[index];
		}
	}else{
		options = default_args;
	}
	this.numPorPag = options['numPorPag'];
	this.numPorNav = options['numPorNav'];
	this.navegacao = options['navagacao'];
  };
  
  /*
  *  Função que altera a página atual
  */
  jPag.prototype.AlterarPagina = function(e){
    var objSelf;
	if(e.type.trim()===""){
	
		objSelf=e;
	}
	else{
		objSelf=this;
	};
	
	
	var eventData = $(objSelf).attr('event-data');
	var indiceVirgula = eventData.indexOf(',');
	
	var proximaVirgula = eventData.indexOf(',',indiceVirgula+1);
	
	var indicePagina = eventData.slice(0,1); 
	var numPPag = eventData.slice(indiceVirgula+1, proximaVirgula);
	var seletor = eventData.slice(proximaVirgula+2,eventData.length -1); //$(eventData).splice(',')[1];
	
	//ocultando todos
	$("'"+seletor+'"').hide();
	
	console.log(indicePagina);
	console.log(seletor);
	console.log(numPPag);
	
	jPag.ExibeItens(indicePagina, seletor, numPPag);
  };
  
  /*Vincula os eventos*/
  jPag.prototype.BindEvents = function(seletor){	
	var jPagInner = this;
	var arrayAPagin = $('a.numPagJs',seletor);
	arrayAPagin.each(function(ind,obj){
	  $(obj).click(jPagInner.AlterarPagina);
	});
	return arrayAPagin;
  };
  
  /*
  *  Calcula Indice Inicial
  */
  jPag.calculaIndiceInicial = function(indiceAtual, numPPag){
	var indiceAtual = parseInt(indiceAtual);
	var numPPag = parseInt(numPPag);
    return (indiceAtual-1)*numPPag;
  };
  
  /*
  *  calculaItemExibido
  *
  *  calcula quantos itens deve ser exibidos
  *  caso seja a ultima paginação e não tenha itens suficientes
  *  para exibir
  */
  jPag.calculaItemExibido = function(indice, numPPag,tamVet){	
	var numPPag = parseInt(numPPag);
	var tamVet = parseInt(tamVet);
	var indice = parseInt(indice);
	
	var indiceInicial = jPag.calculaIndiceInicial(indice, numPPag);
	if(indiceInicial+numPPag <= tamVet)return numPPag;
	return tamVet%numPPag;
  };
  
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
  *  Exibe itens baseado em um indice e na quantidade por página
  */
  jPag.ExibeItens = function(indice, seletor, numPorPag){
	var totalItensNoSeletor = $(seletor).length;
    //itemInicial e itemFinal
	var indiceInicial = jPag.calculaIndiceInicial(indice, numPorPag);
	var totalItens = jPag.calculaItemExibido(indice, numPorPag, totalItensNoSeletor);
	console.log('g'+totalItens);
	for(var i = indiceInicial; i < totalItens;i++){
		console.log('b'+$(seletor).attr('display'));
		$($(seletor)[i]).show();
	}
  };
  
  /*
  *  Montar Paginação
  */
  jPag.prototype.MontarPaginacao = function(seletor){
    var outputHtml, outputNavAntes, outputNavDepois;
	outputNavAntes = '';
	outputHtml = '';
	outputNavDepois = '';
	
	if(this.navegacao){
	  outputNavAntes = this.montarNavAntes();
	  outputNavDepois = this.montarNavDepois();
	}
	
	outputHtml = '<table><tr>{0}{1}{2}</tr></table>';	
	
	jPag.ExibeItens(this.indice, seletor, this.numPPag);
	
	var paginacao = '';
	var totalItem = $(seletor).length/this.numPorPag;
	//paginacao
	for(i = 0; i < totalItem; i++){
		paginacao += '<td>';
		paginacao += '<a href="#" class="numPagJs" event-data="{0},{1},\'{2}\'" >{0}<a>'.format(i+1,this.numPorPag,$(seletor).selector);
		paginacao += '</td>';
	}
	
	if(this.navegacao)
		outputHtml = outputHtml.format(outputNavAntes,outputHtml,outputNavDepois);
	else
		outputHtml = outputHtml.format('',paginacao,'');
	
	return outputHtml;
  }
  
  /*
  * Paginar
  */
  jPag.prototype.Paginar = function(indice, seletor){
	var indice;
    var numPPag, numPNav;
   
	if(typeof(indice) == 'undefined') indice =1;
	this.indice = indice;
	this.seletor = seletor;
	//Ocultar todos os itens
	$(seletor).hide();
	
	this.MontarPaginacao(seletor, this.navegacao);
	
	this.BindEvents(seletor);
  };
  
  return jPag;
})();