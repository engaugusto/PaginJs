test( "calculaIndiceInicial test", function() {
  var j = new jPag();
  var result = j.calculaIndiceInicial(1,2);
  ok( result == 0, "Passed!" );
  
  var result = j.calculaIndiceInicial(2,2);
  ok( result == 2, "Passed!" );
  
  var result = j.calculaIndiceInicial(3,2);
  ok( result == 4, "Passed!" );
  
  var result = j.calculaIndiceInicial(4,2);
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