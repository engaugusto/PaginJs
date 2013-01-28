PaginJs
=======

-Paginação utilizando jQuery
-Exemplo de utilização:
1.Selecione os seletores que devem ser páginados
var sel = $('.teste');

2.Instancia a classe jPag e invoque o método Paginar passando o array seletor como parametro
var j = new jPag();
j.Paginar(sel);

3.Opcionais parametros do construtor abaixo
'numPorPag'	: int número de seletores por página,
'numPorNav': int número de seletores por navegação,
'divPagName': string nome da classe que irá conter a div de navegação,
'navegacao': bool exibir navegação,
'exibeUltimoIndice': bool exibe o último indice com ...[ultimoIndice]

Versão para utilização em produção dentro de output
Compilado no Yuicompresor online (http://refresh-sf.com/yui/)