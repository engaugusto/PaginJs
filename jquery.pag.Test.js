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
  
  var result = j.montarNavAntes();
  ok( '<a class="navAntes" href="#"><<</a><a class="navAntes" href="#"><</a>' == result, "Passed!" );
});

test( "montarNavDepois test", function() {
  var j = new jPag();
  
  var result = j.montarNavDepois();
  ok( '<a class="navDepois" href="#">></a><a class="navDepois" href="#">>></a>' == result, "Passed!" );
});

test( " montarPaginacao test sem navegacao", function(){
  var j = new jPag({
	'numPorPag': 2
  });
  $('body').append('<div class="b" style="display:none" />');
  $('.b').append('<div class="a">Teste123456</div><div class="a">Teste123456</div><div class="a">Teste123456</div>');
  var nDiv = $('div.a');
  
  var outputHtml = j.MontarPaginacao(nDiv);
  
  ok(outputHtml=='<table><tr><td><a href="#" class="numPagJs" event-data="1,2,\'div.a\'" >1<a></td><td><a href="#" class="numPagJs" event-data="2,2,\'div.a\'" >2<a></td></tr></table>');
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
	'numPorPag': 2
  });
  $('body').append('<div class="b" style="display:none" />');
  $('.b').append('<a href="#" class="numPagJs" event-data="1">1<a><a href="#" class="numPagJs" event-data="1">2<a>');
  var nDiv = $('div.b');
  
  var arrayAPagin = j.BindEvents(nDiv);
  
  //verificando se foi vinculado o onclick
  arrayAPagin.each(function(ind,obj){
	  ok($._data( $(obj)[0], "events" ) !== 'undefined');
	});
});

test( "AlterarPagina test", function(){
	var j = new jPag({
		'numPorPag': 2
	});
	$('body').append('<div class="d"><div class="c" style="display:none" >Test1</div><div class="c" style="display:none" >Test2</div><div class="c" style="display:none" >Test3</div></div>');
	$('.d').append('<a href="#" class="numPagJs" event-data="1,2,\'div.c\'">1<a><a href="#" class="numPagJs" event-data="2,2,\'div.c\'">2<a>');
	var nDiv = $('.d .c');
	var arrayAPagin = j.BindEvents(nDiv);
	
	var e = $('.numPagJs', $('.d'))[0];
	j.AlterarPagina(e);
	
	console.log($('div.d'));
	
	ok(1==2);
});

test( "ExibeItens test", function(){
   ok(1==2);
});
