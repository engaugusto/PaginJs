/*
  Jquery Pagination
  
  Author: Carlos Augusto
  Date: 24/01/2013
  vr: 0.01b
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
		'tresPontosClass':'tresPontosClassJsPag', //N�o implementado ainda
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
  *  Fun��o que trata da string event-data e
  *  retorna um objeto JSON
  */
  jPag.HandleEventData = function(eventData){
    var objRet = {
	  indice: null,
	  numPPag: null,
	  numPNav: null,
	  seletor: null,
	  nomeDiv: null
	};
	
	var splitEventData = eventData.split(',');
	
	//removendo o '
	objRet.indice = splitEventData[0].replace(/\'/g,"")
	objRet.numPPag = parseInt(splitEventData[1]);
	objRet.numPNav = parseInt(splitEventData[2]);
	objRet.seletor = splitEventData[3].replace(/\'/g,"")
	if(splitEventData.length == 5){
		objRet.nomeDiv = splitEventData[4].replace(/\'/g,"")
	}else{
		objRet.nomeDiv = ".jPagPag";
	}
	
	return objRet;
  }
  
  /*
  *  Verifica se a div de navega��o n�o existe e criar se neces�rio
  */
  jPag.prototype.VerificaECriarDiv = function(){
    var divNamePag = this.divPagName;
	if(divNamePag.charAt(0) == '.'){
	  divNamePag = divNamePag.replace('.','');
	}
	if($(this.divPagName).length == 0) $('body').append('<div class="{0}"></div>'.format(divNamePag));
  };
  
  /*
  *  Fun��o que altera a p�gina atual
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
	var numPNav = objEventData.numPNav;
	var seletor = objEventData.seletor; 
	var nomePagDiv = objEventData.nomeDiv;
	
	//ocultando todos
	$(seletor).hide();
	
	//Oculta a Navega��o do antes e depois caso primeiro ou ultimo	
	jPag.ExibeItens(indicePagina, seletor, numPPag, nomePagDiv);
	
	//verifica se � o primeiro se for oculta a navega��o anterior
	jPag.VerificaPriUltOculta(nomePagDiv);
	
	jPag.OcultaNavegacaoNaoUtilizada(nomePagDiv, numPNav);
  };
  
  /*
  *  Oculta a navega��o baseado no indice selecionado
  */
  jPag.OcultaNavegacaoNaoUtilizada = function(nomePagDiv, numPorNav){
    var indice = 1;
	//procura indice selecionado
	if($('.numPagJs.selected', nomePagDiv).length != 0){
	 indice = parseInt($('.numPagJs.selected', nomePagDiv).html());
	}
	var totalPaginas = $('.numPagJs',nomePagDiv).length;
	//se s� existe uma p�gina ocultar tudo
	if(totalPaginas < numPorNav){
	  $(nomePagDiv).hide();
	}
	//verificando se o indice j� n�o passou o limite do final
	if(indice+1 >= totalPaginas){
		indice = totalPaginas-2;
	}
	//verificando se o indice j� esta no come�o
	if(indice <= numPorNav){
		indice = 2;
	}
	
	//comeca em 0
	indice--;
	//ocultando todos
	$('.numPagJs', nomePagDiv).parent('td').hide();
	
	//exibindo o pr�prio indice
	$($('.numPagJs', nomePagDiv)[indice]).parent('td').show();
	$('.numPagJs.colchete', nomePagDiv).parent('td').show();
	
	var qtdAExibir =1;
	//se for impar
	if(numPorNav%2 != 0){
	   qtdAExibir = numPorNav-1
	   for(var i = 1;i<=qtdAExibir/2;i++){
	    $($('.numPagJs', nomePagDiv)[indice+i]).parent('td').show();
	    $($('.numPagJs', nomePagDiv)[indice-i]).parent('td').show();
	   }
	}else{
	   qtdAExibir = numPorNav-1;
	   
	   for(var i = 1;i<=Math.ceil(qtdAExibir/2);i++){
	    $($('.numPagJs', nomePagDiv)[indice+i]).parent('td').show();
	   }
	   
	   for(var i = 1;i<=qtdAExibir%2;i++){
		$($('.numPagJs', nomePagDiv)[indice-i]).parent('td').show();
	   }
	}
	
	//ocultando o �ltimo caso ele seja selecionado e a navega��o esteja ativada
	//if(indice == 
  };
  
  /*
  *  Verifica se � primeiro ou o ultimo e oculta a navega��o
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
  *  Adiciona uma classe ao indice selecionado da pagina��o
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
  *  Calcula Pagina��o Final
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
  *  caso seja a ultima pagina��o e n�o tenha itens suficientes
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
  * Montar Navaga��o Anterior
  */
  jPag.prototype.montarNavAntes = function(seletor, numPPag, numPNav){
	var outputHtml = '';
	
	//coloca a pagina��o somente se n�o for a default
	var divPagConcat = '';
	if(this.divPagName != '.jPagPag'){
		 divPagConcat = ",\'{0}\'".format(this.divPagName);
	}
	
	//indice, numPPag, seletor
	outputHtml += 
		'<td class="navTdMenorMenor"><a class="navAntes" target="_self" href="#" event-data="{0},{1},{2},\'{3}\'{4}">{5}</a></td>'
		  .format('P',numPPag,numPNav,seletor, divPagConcat,'<<');
		  
	outputHtml += 
		'<td class="navTdMenor"><a class="navAntes" target="_self" href="#" event-data="{0},{1},{2},\'{3}\'{4}">{5}</a></td>'
		  .format('-1',numPPag,numPNav,seletor, divPagConcat,'<');
	
	return outputHtml;
  }
  
  /*
  * Montar Navaga��o Anterior
  */
  jPag.prototype.montarNavDepois = function(seletor, numPPag, numPNav){
    var outputHtml = '';
	
	//coloca a pagina��o somente se n�o for a default
	var divPagConcat = '';
	if(this.divPagName != '.jPagPag'){
		 divPagConcat = ",\'{0}\'".format(this.divPagName);
	}
	
	outputHtml += 
		'<td class="navTdMaior"><a class="navDepois" target="_self" href="#" event-data="{0},{1},{2},\'{3}\'{4}">{5}</a></td>'
		  .format('+1',numPPag,numPNav,seletor,divPagConcat,'>');
	
	//indice, numPPag, seletor
	outputHtml += 
		'<td class="navTdMaiorMaior"><a class="navDepois" target="_self" href="#" event-data="{0},{1},{2},\'{3}\'{4}">{5}</a></td>'
		  .format('U',numPPag,numPNav,seletor, divPagConcat,'>>');
		
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
  *  Exibe itens baseado em um indice e na quantidade por p�gina
  */
  jPag.ExibeItens = function(indice, seletor, numPorPag, divPagName){
	var totalItensNoSeletor = $(seletor).length;
	var total = $(seletor).length;
	
	if(indice == 'P') indice = 1;
	if(indice == 'U') {
		indice = this.calculaPaginacaoFinal(total,numPorPag); //indice final
	}
	//se for o pr�ximo
	if(String(indice) == '+1'){
	  //pega o selecionado e procura o pr�ximo
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
	
	//adicionando uma classe na p�gina selecionada
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
    
	//coloca a pagina��o somente se n�o for a default
	var divPagConcat = '';
	if(this.divPagName != '.jPagPag'){
		 divPagConcat = ",\'{0}\'".format(this.divPagName);
	}
	var ultimaPagina = jPag.calculaPaginacaoFinal(totalElementos,this.numPorPag)-1;
	
	var ultimaPaginaClass = '';
	var paginacao = '';
	var selected = ' selected';
	var totalPaginas = totalElementos/this.numPorPag;
	//paginacao
	for(i = 0; i < totalPaginas; i++){
		paginacao += '<td>';
		if(i == ultimaPagina){
		  ultimaPaginaClass = ' ultimo'
		}
		if(i != 0){
		  selected = '';
		}
		paginacao += '<a href="#" target="_self" class="numPagJs{6}{5}" event-data="{0},{1},{2},\'{3}\'{4}">{0}</a>'.format(i+1,this.numPorPag,this.numPorNav,seletorNome,divPagConcat, ultimaPaginaClass, selected);
		paginacao += '</td>';
	}
	if(this.exibeUltimoIndice)
	    paginacao += '<td><div class="tresPontosClassJsPag">...</div><a href="#" target="_self" class="numPagJs ultimo colchete" event-data="{0},{1},{2},\'{3}\'{4}">[ {0} ]</a></td>'.format(i,this.numPorPag,this.numPorNav,seletorNome,divPagConcat);
	
	return paginacao;
  };
  
  /*
  *  Montar Pagina��o e Navega��o
  */
  jPag.prototype.MontarPaginacaoENavegacao = function(seletor){
    var outputHtml, outputNavAntes, outputNavDepois;
	outputNavAntes = '';
	outputHtml = '';
	outputNavDepois = '';
	
	if(this.navegacao){
	  outputNavAntes = this.montarNavAntes($(seletor).selector, this.numPorPag, this.numPorNav);
	  outputNavDepois = this.montarNavDepois($(seletor).selector, this.numPorPag, this.numPorNav);
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
  * Fun��o que vincula os eventos e pagina
  * Fun��o Principal
  */
  jPag.prototype.Paginar = function(seletor){
	var indice;
    var numPPag, numPNav;
	
    var nomePagDiv = this.divPagName;
	var numPNav = this.numPorNav;
	this.seletor = seletor;
	//Ocultar todos os itens
	$(seletor).hide();
	
	$(this.divPagName).append(this.MontarPaginacaoENavegacao(seletor));
	
	jPag.VerificaPriUltOculta(this.divPagName);
	jPag.OcultaNavegacaoNaoUtilizada(nomePagDiv, numPNav);
	
	this.BindEvents(seletor);
  };
  
  
  return jPag;
})();