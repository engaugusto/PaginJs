test( "calculaIndiceInicial test", function() {
  var result = jPag.calculaIndiceInicial(1,2);
  ok( result == 0, "Passed!" );
  
  var result = jPag.calculaIndiceInicial(2,2);
  ok( result == 2, "Passed!" );
  
  var result = jPag.calculaIndiceInicial(3,2);
  ok( result == 4, "Passed!" );
  
  var result = jPag.calculaIndiceInicial(4,2);
  ok( result == 6, "Passed!" );
});

test( "montarNavAntes test", function() {
  var j = new jPag();
  
  $('body').append('<div class="montarNavAntes" style="display:none"><div class="c" style="display:none" >Test1</div><div class="c" style="display:none" >Test2</div><div class="c" style="display:none" >Test3</div></div>');

  var seletor = '.montarNavAntes .c';
  
  var result = j.montarNavAntes(seletor,2);
  ok('<td><a class="navAntes" href="#" event-data="P,2,\'.montarNavAntes .c\'"><<</a></td><td><a class="navAntes" href="#" event-data="-1,2,\'.montarNavAntes .c\'"><</a></td>'
		== result, "Passed!" );
});

test( "montarNavDepois test", function() {
  var j = new jPag();
  
  $('body').append('<div class="montarNavDepois" style="display:none"><div class="c" style="display:none" >Test1</div><div class="c" style="display:none" >Test2</div><div class="c" style="display:none" >Test3</div></div>');
  
  var seletor = '.montarNavDepois .c'
  
  var result = j.montarNavDepois(seletor, 2);
  //console.log(result);
  ok( '<td><a class="navDepois" href="#" event-data="+1,2,\'.montarNavDepois .c\'">></a></td><td><a class="navDepois" href="#" event-data="U,2,\'.montarNavDepois .c\'">>></a></td>' == result, "Passed!" );
});

test( "calculaItemExibido test", function(){
  $('body').append('<div class="b" style="display:none" />');
  $('.b').append('<div class="a">Teste123456</div><div class="a">Teste123456</div><div class="a">Teste123456</div>');
  var nDiv = $('div.a');
  
  var result = jPag.calculaItemExibido(3,3,8);
  ok(result == 2);
  
  var result = jPag.calculaItemExibido(3,3,9);
  ok(result == 3);
  
  var result = jPag.calculaItemExibido(2,4,7);
  ok(result == 3);
});

test( "bindEvents test", function(){
  var j = new jPag({
	'numPorPag': 2,
	'divPagName': '.BindEventsTest'
  });
  $('body').append('<div class="BindEventsTest" style="display:none" />');
  $('.BindEventsTest').append('<a href="#" class="numPagJs" event-data="1">1<a><a href="#" class="numPagJs" event-data="1">2<a>');
  var nDiv = $('div.BindEventsTest');
  
  var arrayAPagin = j.BindEvents(nDiv);
  $('.BindEventsTest').hide();
  
  //verificando se foi vinculado o onclick
  arrayAPagin.each(function(ind,obj){
	  ok($._data( $(obj)[0], "events" ) !== 'undefined');
	});
});

test( "AlterarPagina test indice 1", function(){
	var j = new jPag({
		'numPorPag': 2
	});
	$('body').append('<div class="d" style="display:none"><div class="c" style="display:none" >Test1</div><div class="c" style="display:none" >Test2</div><div class="c" style="display:none" >Test3</div></div>');
	//event-data = indice-pagina, numPPag, seletor
	$('.d').append('<a href="#" class="numPagJs" event-data="1,2,\'.d div.c\'">1<a><a href="#" class="numPagJs" event-data="2,2,\'.d div.c\'">2<a>');
	
	var e = $('.numPagJs', $('.d'))[0];
	j.AlterarPagina(e);
	
	ok($($('.d .c')[0]).css('display') !== 'none', 'Passed');
	ok($($('.d .c')[1]).css('display') !== 'none', 'Passed');
	ok($($('.d .c')[2]).css('display') === 'none', 'Passed');
});

test( "AlterarPagina test indice 2", function(){
	var j = new jPag({
		'numPorPag': 2
	});
	$('body').append('<div class="alterarPagina2" style="display:none"><div class="c" style="display:none" >Test1</div><div class="c" style="display:none" >Test2</div><div class="c" style="display:none" >Test3</div></div>');
	//event-data = indice-pagina, numPPag, seletor
	$('.alterarPagina2').append('<a href="#" class="numPagJs" event-data="1,2,\'.alterarPagina2 div.c\'">1<a><a href="#" class="numPagJs" event-data="2,2,\'.alterarPagina2 div.c\'">2<a>');
	
	//clicando no segundo item da paginacao 2
	var e = $('.numPagJs', $('.alterarPagina2'))[1];
	j.AlterarPagina(e);
	
	ok($($('.alterarPagina2 .c')[0]).css('display') === 'none', 'Passed');
	ok($($('.alterarPagina2 .c')[1]).css('display') === 'none', 'Passed');
	ok($($('.alterarPagina2 .c')[2]).css('display') !== 'none', 'Passed');
});

test( "Exibe Itens Primeiro Item Test", function(){
	$('body').append('<div class="ExibeItensPrimeiro" style="display:none"><div class="c" style="display:none" >Test1</div><div class="c" style="display:none" >Test2</div><div class="c" style="display:none" >Test3</div></div>');
	
	//clicando no segundo item da paginacao 2
	jPag.ExibeItens('P', '.ExibeItensPrimeiro .c', 2);
	
	ok($($('.ExibeItensPrimeiro .c')[0]).css('display') !== 'none', 'Passed');
	ok($($('.ExibeItensPrimeiro .c')[1]).css('display') !== 'none', 'Passed');
	ok($($('.ExibeItensPrimeiro .c')[2]).css('display') === 'none', 'Passed');
});

test( "ExibeItens test Ultimo Item", function(){
	$('body').append('<div class="ExibeItensUltimo" style="display:none"><div class="c" style="display:none" >Test1</div><div class="c" style="display:none" >Test2</div><div class="c" style="display:none" >Test3</div></div>');
	
	//clicando no segundo item da paginacao 2
	jPag.ExibeItens('U', '.ExibeItensUltimo .c', 2);
	
	ok($($('.ExibeItensUltimo .c')[0]).css('display') === 'none', 'Passed');
	ok($($('.ExibeItensUltimo .c')[1]).css('display') === 'none', 'Passed');
	ok($($('.ExibeItensUltimo .c')[2]).css('display') !== 'none', 'Passed');
});

test("ExibeItens Proximo Test", function(){
	var j = new jPag({
		'numPorPag': 2,
		'divPagName': 'divNavExibeItensProximo'
	});
	$('body').append('<div class="ExibeItensProximo" style="display:none"><div class="c" style="display:none" >Test1</div><div class="c" style="display:none" >Test2</div><div class="c" style="display:none" >Test3</div></div>');
	var seletor = '.ExibeItensProximo .c';
	
	$('.divNavExibeItensProximo').append('<a href="#" class="selected numPagJs">1</a><a href="#" class="numPagJs">2</a>');
	$('.divNavExibeItensProximo').hide();
	
	jPag.ExibeItens('+1',seletor,2, '.divNavExibeItensProximo');
	
	ok($($(seletor)[0]).css('display') === 'none', 'Passed');
	ok($($(seletor)[1]).css('display') === 'none', 'Passed');
	ok($($(seletor)[2]).css('display') !== 'none', 'Passed');
});

test("ExibeItens Proximo Vai Pro Ultimo Test", function(){
	var j = new jPag({
		'numPorPag': 2,
		'divPagName': 'divNavExibeItensProximoProUltimo'
	});
	$('body').append('<div class="ExibeItensProximoVaiUlt" style="display:none"><div class="c" style="display:none" >Test1</div><div class="c" style="display:none" >Test2</div><div class="c" style="display:none" >Test3</div></div>');
	var seletor = '.ExibeItensProximoVaiUlt .c';
	
	$('.divNavExibeItensProximoProUltimo').append('<a href="#" class="numPagJs">1</a><a href="#" class="selected numPagJs">2</a>');
	$('.divNavExibeItensProximoProUltimo').hide();
	
	jPag.ExibeItens('+1',seletor, 2, '.divNavExibeItensProximoProUltimo');
	
	ok($($(seletor)[0]).css('display') === 'none', 'Passed');
	ok($($(seletor)[1]).css('display') === 'none', 'Passed');
	ok($($(seletor)[2]).css('display') !== 'none', 'Passed');
});

test("ExibeItens Anterior Test", function(){
	var j = new jPag({
		'numPorPag': 2,
		'divPagName': 'divNavExibeItensAnterior'
	});
	$('body').append('<div class="ExibeItensAnterior" style="display:none"><div class="c" style="display:none" >Test1</div><div class="c" style="display:none" >Test2</div><div class="c" style="display:none" >Test3</div></div>');
	var seletor = '.ExibeItensAnterior .c';
	
	$('.divNavExibeItensAnterior').append('<a href="#" class="numPagJs">1</a><a href="#" class="selected numPagJs">2</a>');
	$('.divNavExibeItensAnterior').hide();
	
	jPag.ExibeItens('-1',seletor,2, '.divNavExibeItensAnterior');
	
	ok($($(seletor)[0]).css('display') !== 'none', 'Passed');
	ok($($(seletor)[1]).css('display') !== 'none', 'Passed');
	ok($($(seletor)[2]).css('display') === 'none', 'Passed');
});

test("ExibeItens Anterior Vai pro Primeiro Test", function(){
	var j = new jPag({
		'numPorPag': 2,
		'divPagName': 'divNavExibeItensAnteriorVaiProPrimeiro'
	});
	$('body').append('<div class="ExibeItensAnteriorVaiProPrimeiro" style="display:none"><div class="c" style="display:none" >Test1</div><div class="c" style="display:none" >Test2</div><div class="c" style="display:none" >Test3</div></div>');
	var seletor = '.ExibeItensAnteriorVaiProPrimeiro .c';
	
	$('.divNavExibeItensAnteriorVaiProPrimeiro').append('<a href="#" class="selected numPagJs">1</a><a href="#" class="numPagJs">2</a>');
	$('.divNavExibeItensAnteriorVaiProPrimeiro').hide();
	
	jPag.ExibeItens('-1',seletor,2, '.divNavExibeItensAnteriorVaiProPrimeiro');
	
	ok($($(seletor)[0]).css('display') !== 'none', 'Passed');
	ok($($(seletor)[1]).css('display') !== 'none', 'Passed');
	ok($($(seletor)[2]).css('display') === 'none', 'Passed');
});

test( "ExibeItens test", function(){
    var j = new jPag({
		'numPorPag': 2,
		'divPagName': 'navExibeItens'
	});
	$('body').append('<div class="ExibeItens" style="display:none"><div class="c" style="display:none" >Test1</div><div class="c" style="display:none" >Test2</div><div class="c" style="display:none" >Test3</div></div>');
	
	var seletor = '.ExibeItens .c';
	jPag.ExibeItens(1,seletor,2);
	
	ok($($(seletor)[0]).css('display') !== 'none', 'Passed');
	ok($($(seletor)[1]).css('display') !== 'none', 'Passed');
	ok($($(seletor)[2]).css('display') === 'none', 'Passed');
	
	//reiniciando
	$(seletor).hide();
	var seletor = '.ExibeItens .c';
	jPag.ExibeItens(2,seletor,2);
	
	ok($($(seletor)[0]).css('display') === 'none', 'Passed');
	ok($($(seletor)[1]).css('display') === 'none', 'Passed');
	ok($($(seletor)[2]).css('display') !== 'none', 'Passed');
});

test("calculaPaginacaoFinal Test", function(){	
  var result = jPag.calculaPaginacaoFinal(10,2);
  ok(result==5);
  
  var result = jPag.calculaPaginacaoFinal(9,2);
  ok(result==5);
});


test( " montarPaginacao test sem navegacao", function(){
  var j = new jPag({
	'numPorPag': 2
  });
  $('body').append('<div class="montarPaginacaoPai" style="display:none" />');
  $('.montarPaginacaoPai').append('<div class="a">Teste123456</div><div class="a">Teste123456</div><div class="a">Teste123456</div>');
  var nDiv = $('.montarPaginacaoPai .a');
  
  var outputHtml = j.MontarPaginacaoENavegacao(nDiv);
  //console.log(outputHtml);
  ok(outputHtml=='<table><tr><td><a href="#" class="numPagJs" event-data="1,2,\'.montarPaginacaoPai .a\'">1<a></td><td><a href="#" class="numPagJs ultimo" event-data="2,2,\'.montarPaginacaoPai .a\'">2<a></td></tr></table>');
});

test( " montarPaginacao test com navegacao", function(){
  $('body').append('<div class="montarPaginacaoPaiComNav" style="display:none" />');
  //elementos
  //htmlDiv
  var htmlDiv = '';
  for(var i=0;i<3;i++){
    htmlDiv += '<div class="a">Teste 133</div>';
  }
  $('.montarPaginacaoPaiComNav').append(htmlDiv);
  
  var nDiv = $('.montarPaginacaoPaiComNav .a');
  var j = new jPag({
	'numPorPag': 2,
	'navegacao': true
  });
  var outputHtml = j.MontarPaginacaoENavegacao(nDiv);
  
  //var qtdPaginacao = $('.resultMontarPaginacao .numPagJs').length;
  //console.log(outputHtml);
  ok(outputHtml == '<table><tr><td><a class="navAntes" href="#" event-data="P,2,\'.montarPaginacaoPaiComNav .a\'"><<</a></td><td><a class="navAntes" href="#" event-data="-1,2,\'.montarPaginacaoPaiComNav .a\'"><</a></td><td><a href="#" class="numPagJs" event-data="1,2,\'.montarPaginacaoPaiComNav .a\'">1<a></td><td><a href="#" class="numPagJs ultimo" event-data="2,2,\'.montarPaginacaoPaiComNav .a\'">2<a></td><td><a class="navDepois" href="#" event-data="+1,2,\'.montarPaginacaoPaiComNav .a\'">></a></td><td><a class="navDepois" href="#" event-data="U,2,\'.montarPaginacaoPaiComNav .a\'">>></a></td></tr></table>', 'Passed');
});

//teste função principal
test( "Paginar Test", function(){
  $('body').append('<div class="Paginar" style="display:none" />');
  //elementos
  //htmlDiv
  var htmlDiv = '';
  for(var i=0;i<3;i++){
    htmlDiv += '<div class="a">Teste 133</div>';
  }
  $('.Paginar').append(htmlDiv);
  
  var nDiv = $('.Paginar .a');
  var j = new jPag({
	'numPorPag': 2,
	'navegacao': true,
	'divPagName': '.pagTestPaginar'
  });
  var outputHtml = j.Paginar(nDiv);
  $('.pagTestPaginar').hide();
  
  ok($('.Paginar').css('display') == 'none', 'Passed');
  ok($('.pagTestPaginar .numPagJs').length == 2, 'Passed');
  //console.log($('.pagTestPaginar .numPagJs'));
  $('.pagTestPaginar').hide();
});

test( "Verifica e cria div Test", function(){
  ok($('.pagTest').length == 0, 'Esperado que a div pagTest não exista');
  ok($('.navTest').length == 0, 'Esperado que a div navTest não exista');
  var j = new jPag({
	'numPorPag': 2,
	'navegacao': true,
	'divPagName': 'pagTest',
	'divNavName': 'navTest'
  });
  ok($('.pagTest').length == 1, 'Esperado que a div pagTest exista');
  
});

test('PaginacaoSelect Test', function(){
  $('body').append('<div class="PaginacaoSelect" style="display:none" />');
  
  $('.PaginacaoSelect').append('<table><tr><td><a class="navAntes" href="#" event-data="P,2,\'.montarPaginacaoPaiComNav .a\'"><<</a></td><td><a class="navAntes" href="#" event-data="-1,2,\'.montarPaginacaoPaiComNav .a\'"><</a></td><td><a href="#" class="numPagJs" event-data="1,2,\'.montarPaginacaoPaiComNav .a\'">1<a></td><td><a href="#" class="numPagJs" event-data="2,2,\'.montarPaginacaoPaiComNav .a\'">2<a></td><td><a class="navDepois" href="#" event-data="+1,2,\'.montarPaginacaoPaiComNav .a\'">></a></td><td><a class="navDepois" href="#" event-data="U,2,\'.montarPaginacaoPaiComNav .a\'">>></a></td></tr></table>');
  jPag.PaginacaoSelect(1, '.PaginacaoSelect');
  
  ok($($('.PaginacaoSelect .numPagJs')[0]).hasClass('selected') == true, 'Esperado que o numero 1 da paginacao tivesse a classe selected');
  ok($($('.PaginacaoSelect .numPagJs')[1]).hasClass('selected') == false, 'Esperado que o numero 2 da paginacao não tivesse a classe selected');
  
  jPag.PaginacaoSelect(2, '.PaginacaoSelect');
  
  ok($($('.PaginacaoSelect .numPagJs')[0]).hasClass('selected') == false, 'Esperado que o numero 1 da paginacao não tivesse a classe selected');
  ok($($('.PaginacaoSelect .numPagJs')[1]).hasClass('selected') == true, 'Esperado que o numero 2 da paginacao tivesse a classe selected');
});

test('HandleEventData Test', function(){
  var stringTest = '';
  var result = '';
  
  stringTest = '\'+1\',2,\'.divSeletor\',\'.divPag\'';	
  result = jPag.HandleEventData(stringTest);
  ok(result.indice == "+1", "Esperado \'+1\'")
  ok(result.numPPag == 2, "Esperado 2")
  ok(result.seletor == '.divSeletor', "Esperado .divSeletor")
  ok(result.nomeDiv == '.divPag', "Esperado .divPag")
  
  stringTest = '5,4,\'.divSeletor2\',\'.divPag3\'';	
  result = jPag.HandleEventData(stringTest);
  ok(result.indice == 5, "Esperado 5")
  ok(result.numPPag == 4, "Esperado 4")
  ok(result.seletor == '.divSeletor2', "Esperado .divSeletor")
  ok(result.nomeDiv == '.divPag3', "Esperado .divPag")
  
  //com o nome Da Div null
  stringTest = '5,4,\'.divSeletor2\'';	
  result = jPag.HandleEventData(stringTest);
  ok(result.indice == 5, "Esperado 5")
  ok(result.numPPag == 4, "Esperado 4")
  ok(result.seletor == '.divSeletor2', "Esperado .divSeletor")
  ok(result.nomeDiv == '.jPagPag', "Esperado .jPagPag")
});

test("MontaHtmlPaginacao Test", function(){
  var j = new jPag();
  
  var numPPagDefault = j.getNumPorPag();
  var result = j.MontaHtmlPaginacao('a',1);
  ok(result=='<td><a href="#" class="numPagJs ultimo" event-data="1,'
	   +numPPagDefault+
	   ',\'a\'">1<a></td>',
	   'Esperado 1 td');
  result = j.MontaHtmlPaginacao('c',3);
  ok(result=='<td><a href="#" class="numPagJs" event-data="1,' 
	   +numPPagDefault+
	   ',\'c\'">1<a></td><td><a href="#" class="numPagJs ultimo" event-data="2,'
	   +numPPagDefault+
	   ',\'c\'">2<a></td>','Esperado 2 td\'s');
  
  var j = new jPag({'divPagName': '.testPagDiv'});
  result = j.MontaHtmlPaginacao('c',3);
  
  ok(result=='<td><a href="#" class="numPagJs" event-data="1,'+numPPagDefault+',\'c\',\'.testPagDiv\'">1<a></td><td><a href="#" class="numPagJs ultimo" event-data="2,'+numPPagDefault+',\'c\',\'.testPagDiv\'">2<a></td>','Esperado que fossem 2 tds com o nome da div de paginacao');
});

test('numPorPag Test', function(){
  var j = new jPag({numPorPag:1});
  ok(j.getNumPorPag() == 1, "Esperado 1");
  var j = new jPag({numPorPag:5});
  ok(j.getNumPorPag() == 5, "Esperado 5");
  var j = new jPag({numPorPag:7});
  ok(j.getNumPorPag() == 7, "Esperado 7");
});

test('exibeUltimoIndice Test', function(){
    var j = new jPag({exibeUltimoIndice: true});
	var numPPagDefault = j.getNumPorPag();
	
    var result = j.MontaHtmlPaginacao('a',3);
	//console.log(result);
    ok(result==
	  '<td><a href="#" class="numPagJs" event-data="1,'+numPPagDefault+',\'a\'">1<a></td>'+
	  '<td><a href="#" class="numPagJs ultimo" event-data="2,'+numPPagDefault+',\'a\'">2<a></td>'+
	  '<td>...[<a href="#" class="numPagJs ultimo" event-data="2,'+numPPagDefault+',\'a\'">2<a>]</td>',
	  'Esperado 2 linhas com td e o ... com o ultimo indice');
});

test("IndiceItemSelecionado Test", function(){
  $('body').append('<div class="IndiceItemSelTest" style="display:none" />');
  $('.IndiceItemSelTest').append('<a href="#" class="selected numPagJs" event-data="1">1<a><a href="#" class="numPagJs" event-data="1">2<a>');
  var result = jPag.IndiceItemSelecionado('.IndiceItemSelTest');
  ok(result==1,'Esperado 1 recebido '+result);
  
  //outro test
  $('.IndiceItemSelTest').html('');
  $('.IndiceItemSelTest').append('<a href="#" class="numPagJs" event-data="1">1<a><a href="#" class="numPagJs" event-data="1">2<a>');
  var result = jPag.IndiceItemSelecionado('.IndiceItemSelTest');
  ok(result==0,'Esperado 0 recebido '+result);
});

test("VerificaPriUltOcuta Primeiro Oculto Test", function(){
  ok(1==2);
});

test("VerificaPriUltOcuta Ultimo Oculto Test", function(){
  ok(1==2);
});

test("MontaHtmlPaginacao Ultimo Class Test", function(){
	ok(1==2);
});