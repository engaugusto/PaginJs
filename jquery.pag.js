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
		'numPorPag'	:	2,
		'numPorNav':	3,
		'divPagName': '.jPagPag',
		'navegacao': false,
		'exibeUltimoIndice': false
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
	this.navegacao = options['navegacao'];
	//nome das div's
	this.divPagName = options['divPagName'];
	this.exibeUltimoIndice = options['exibeUltimoIndice'];
	
	this.VerificaECriarDiv();
  };
  
  
  /*
  *  Propriedade do numPorPag
  */
  jPag.prototype.getNumPorPag = function(){
    return this.numPorPag;
  };
  
  /*
  *  Função que trata da string event-data e
  *  retorna um objeto JSON
  */
  jPag.HandleEventData = function(eventData){
    var objRet = {
	  indice: null,
	  numPPag: null,
	  seletor: null,
	  nomeDiv: null
	};
	
	var splitEventData = eventData.split(',');
	
	//removendo o '
	objRet.indice = splitEventData[0].replace(/\'/g,"")
	objRet.numPPag = parseInt(splitEventData[1]);
	objRet.seletor = splitEventData[2].replace(/\'/g,"")
	if(splitEventData.length == 4){
		objRet.nomeDiv = splitEventData[3].replace(/\'/g,"")
	}else{
		objRet.nomeDiv = ".jPagPag";
	}
	
	return objRet;
  }
  
  /*
  *  Verifica se a div de navegação não existe e criar se necesário
  */
  jPag.prototype.VerificaECriarDiv = function(){
    var divNamePag = this.divPagName;
	if(divNamePag.charAt(0) == '.'){
	  divNamePag = divNamePag.replace('.','');
	}
	if($(this.divPagName).length == 0) $('body').append('<div class="{0}"></div>'.format(divNamePag));
	//if($(this.divNavName).length == 0) $('body').append('<div class="{0}"></div>'.format(this.divNavName));
  };
  
  /*
  *  Função que altera a página atual
  *  formato esperado do event-data
  *  {0},{1},{2},{3] = indicePagina, numPPag, seletor, nomeDivPaginacao
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
	var objEventData = jPag.HandleEventData(eventData);
	
	var indicePagina = objEventData.indice; 
	var numPPag = objEventData.numPPag;
	var seletor = objEventData.seletor; 
	var nomeDiv = objEventData.nomeDiv;
	
	//ocultando todos
	$(seletor).hide();
	
	//Oculta a Navegação do antes e depois caso primeiro ou ultimo	
	jPag.ExibeItens(indicePagina, seletor, numPPag, nomeDiv);
	
	//verifica se é o primeiro se for oculta a navegação anterior
	jPag.VerificaPriUltOculta(nomeDiv);
  };
  
  /*
  *  Verifica se é primeiro ou o ultimo e oculta a navegação
  */
  jPag.VerificaPriUltOculta = function(divPagName){
	if($('.numPagJs.selected', divPagName).html() == '1'
	   || $('.numPagJs.selected', divPagName).length == 0){
	   $('.navAntes', divPagName).hide();
	 }else{
	   $('.navAntes', divPagName).show();
	 }
	if($('.numPagJs.selected.ultimo', divPagName).length >= 1){
	   $('.navDepois', divPagName).hide();
	}else{
	   $('.navDepois', divPagName).show();
	}
  };
  
  /*
  *  Adiciona uma classe ao indice selecionado da paginação
  */
  jPag.PaginacaoSelect = function(indice, seletor){
	var indice = String(indice);
	
    $('.numPagJs', seletor).each(function(ind,obj){
		if(indice == $(obj).html()){
		  if(!$(obj).hasClass('selected'))
		    $(obj).addClass('selected');	
		}else{
		  $(obj).removeClass('selected');
		}
	});
  }
  
  /*
  *  Vincula os eventos
  */
  jPag.prototype.BindEvents = function(){	
	var jPagInner = this;
	//colocando nos links
	var arrayAPagin = $('a.numPagJs, .navDepois, .navAntes',this.divPagName);
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
  *  Calcula Paginação Final
  */
  jPag.calculaPaginacaoFinal = function(total, numPPag){
    var total = parseInt(total);
	var numPPag = parseInt(numPPag);
	
	if(total%numPPag == 0) return total/numPPag;
	return 	Math.floor(total/numPPag)+1;
  };
  
  /*
  *  calculaItemExibido
  *
  *  calcula quantos itens deve ser exibidos
  *  caso seja a ultima paginação e não tenha itens suficientes
  *  para exibir
  */
  jPag.calculaItemExibido = function(indice, numPPag, tamVet){
	var numPPag = parseInt(numPPag);
	var tamVet = parseInt(tamVet);
	var indice = parseInt(indice);
	var indiceInicial = jPag.calculaIndiceInicial(indice, numPPag);
	
	if(indiceInicial+numPPag <= tamVet)return numPPag;
	return tamVet%numPPag;
  }
  
  /*
  * Montar Navagação Anterior
  */
  jPag.prototype.montarNavAntes = function(seletor, numPPag){
	var outputHtml = '';
	
	//coloca a paginação somente se não for a default
	var divPagConcat = '';
	if(this.divPagName != '.jPagPag'){
		 divPagConcat = ",\'{0}\'".format(this.divPagName);
	}
	
	//indice, numPPag, seletor
	outputHtml += 
		'<td><a class="navAntes" href="#" event-data="{0},{1},\'{2}\'{4}">{3}</a></td>'
		  .format('P',numPPag,seletor,'<<', divPagConcat);
		  
	outputHtml += 
		'<td><a class="navAntes" href="#" event-data="{0},{1},\'{2}\'{4}">{3}</a></td>'
		  .format('-1',numPPag,seletor,'<', divPagConcat);
	
	return outputHtml;
  }
  
  /*
  * Montar Navagação Anterior
  */
  jPag.prototype.montarNavDepois = function(seletor, numPPag){
    var outputHtml = '';
	
	//coloca a paginação somente se não for a default
	var divPagConcat = '';
	if(this.divPagName != '.jPagPag'){
		 divPagConcat = ",\'{0}\'".format(this.divPagName);
	}
	
	outputHtml += 
		'<td><a class="navDepois" href="#" event-data="{0},{1},\'{2}\'{4}">{3}</a></td>'
		  .format('+1',numPPag,seletor,'>', divPagConcat);
	
	//indice, numPPag, seletor
	outputHtml += 
		'<td><a class="navDepois" href="#" event-data="{0},{1},\'{2}\'{4}">{3}</a></td>'
		  .format('U',numPPag,seletor,'>>', divPagConcat);
		
	return outputHtml;
  } 
  
  /*
  *  Procura item selecionado
  */
  jPag.IndiceItemSelecionado = function(divPagName){
    if($('.numPagJs.selected',divPagName).length >= 1) return parseInt($('.numPagJs.selected', $(divPagName)).html());
	return 0;
  }
  
  /*
  *  Exibe itens baseado em um indice e na quantidade por página
  */
  jPag.ExibeItens = function(indice, seletor, numPorPag, divPagName){
	var totalItensNoSeletor = $(seletor).length;
	var total = $(seletor).length;
	
	if(indice == 'P') indice = 1;
	if(indice == 'U') {
		indice = this.calculaPaginacaoFinal(total,numPorPag); //indice final
	}
	//se for o próximo
	if(String(indice) == '+1'){
	  //pega o selecionado e procura o próximo
	  indice = jPag.IndiceItemSelecionado(divPagName)+1;
	  var indiceFinal = this.calculaPaginacaoFinal(total,numPorPag);
	  if(indice >= indiceFinal)
		indice = indiceFinal;
	}	
	//se for o o anterior
	if(indice == '-1'){
	  indice = jPag.IndiceItemSelecionado(divPagName)-1;
	  if(indice<=0)
		indice = 1;
	}
	
	//adicionando uma classe na página selecionada
	jPag.PaginacaoSelect(indice);
	
    //itemInicial e itemFinal
	var indiceInicial = jPag.calculaIndiceInicial(indice, numPorPag);
	var totalItens = jPag.calculaItemExibido(indice, numPorPag, totalItensNoSeletor);
	
	for(var i = 0; i < totalItens;i++){
		$($(seletor)[indiceInicial+i]).show();
	}
  };
  
  /*
  *  Monta a Html de paginacao 
  */
  jPag.prototype.MontaHtmlPaginacao = function(seletorNome, totalElementos){
    
	//coloca a paginação somente se não for a default
	var divPagConcat = '';
	if(this.divPagName != '.jPagPag'){
		 divPagConcat = ",\'{0}\'".format(this.divPagName);
	}
	var ultimaPagina = jPag.calculaPaginacaoFinal(totalElementos,this.numPorPag)-1;
	
	var ultimaPaginaClass = '';
	var paginacao = '';
	var totalPaginas = totalElementos/this.numPorPag;
	//paginacao
	for(i = 0; i < totalPaginas; i++){
		paginacao += '<td>';
		if(i == ultimaPagina){
		  ultimaPaginaClass = ' ultimo'
		}
		paginacao += '<a href="#" class="numPagJs{4}" event-data="{0},{1},\'{2}\'{3}">{0}<a>'.format(i+1,this.numPorPag,seletorNome,divPagConcat, ultimaPaginaClass);
		paginacao += '</td>';
	}
	if(this.exibeUltimoIndice)
	    paginacao += '<td>...[<a href="#" class="numPagJs ultimo" event-data="{0},{1},\'{2}\'{3}">{0}<a>]</td>'.format(i,this.numPorPag,seletorNome,divPagConcat);
	
	return paginacao;
  };
  
  /*
  *  Montar Paginação e Navegação
  */
  jPag.prototype.MontarPaginacaoENavegacao = function(seletor){
    var outputHtml, outputNavAntes, outputNavDepois;
	outputNavAntes = '';
	outputHtml = '';
	outputNavDepois = '';
	
	if(this.navegacao){
	  outputNavAntes = this.montarNavAntes($(seletor).selector, this.numPorPag);
	  outputNavDepois = this.montarNavDepois($(seletor).selector, this.numPorPag);
	}
	
	outputHtml = '<table><tr>{0}{1}{2}</tr></table>';	
	
	//Exibe sempre a primeira pagina (indice = 1)
	jPag.ExibeItens(1, seletor, this.numPorPag, this.divPagName);
	
	var paginacao = this.MontaHtmlPaginacao($(seletor).selector,$(seletor).length);
	
	if(this.navegacao)
		outputHtml = outputHtml.format(outputNavAntes,paginacao,outputNavDepois);
	else
		outputHtml = outputHtml.format('',paginacao,'');
	
	return outputHtml;
  }
  
  /*
  * Paginar
  * Função que vincula os eventos e pagina
  * Função Principal
  */
  jPag.prototype.Paginar = function(seletor){
	var indice;
    var numPPag, numPNav;
   
	this.seletor = seletor;
	//Ocultar todos os itens
	$(seletor).hide();
	
	$(this.divPagName).append(this.MontarPaginacaoENavegacao(seletor));
	
	jPag.VerificaPriUltOculta(this.divPagName);
	
	this.BindEvents(seletor);
  };
  
  
  return jPag;
})();