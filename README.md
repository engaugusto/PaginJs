PaginJs
=======

Requisitos
==
Foi desenvolvido com o servidor NodeJs + ExpressJs

==Descri��o
-Pagina��o utilizando jQuery
-Exemplo de utiliza��o:
1.Selecione os seletores que devem ser p�ginados
var sel = $('.teste');

2.Instancia a classe jPag e invoque o m�todo Paginar passando o array seletor como parametro
var j = new jPag();
j.Paginar(sel);

3.Opcionais parametros do construtor abaixo
'numPorPag'	: int n�mero de seletores por p�gina,
'numPorNav': int n�mero de seletores por navega��o,
'divPagName': string nome da classe que ir� conter a div de navega��o,
'navegacao': bool exibir navega��o,
'exibeUltimoIndice': bool exibe o �ltimo indice com ...[ultimoIndice]

==Release
Vers�o para utiliza��o em produ��o dentro de output
Compilado no Yuicompresor online (http://refresh-sf.com/yui/)