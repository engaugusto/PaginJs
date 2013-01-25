var express = require('express');
var fs = require('fs');
var app = express();

app.use(express.bodyParser());


/*qunit*/
app.get('/qunit/qunit.js', function(req, res){
    console.log('GET /qunit.js')
    var html = fs.readFileSync('qunit/qunit.js');
    res.writeHead(200, {'Content-Type': 'application/x-javascript'});
    res.end(html);
});
app.get('/qunit/qunit.css', function(req, res){
    console.log('GET /qunit.css')
    var html = fs.readFileSync('qunit/qunit.css');
    res.writeHead(200, {'Content-Type': 'text/css'});
    res.end(html);
});
/*html*/
app.get('/test', function(req, res){
    console.log('GET /test')
    var html = fs.readFileSync('qunit.html');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
});
/**/

/*JqueryPagTest*/
app.get('/jquery.pag.Test.js', function(req, res){
    console.log('GET /jquery.pag.Test')
    var html = fs.readFileSync('jquery.pag.Test.js');
    res.writeHead(200, {'Content-Type': 'application/x-javascript'});
    res.end(html);
});
/*JqueryPag*/
app.get('/jquery.pag.js', function(req, res){
    console.log('GET /jquery.pag')
    var html = fs.readFileSync('jquery.pag.js');
    res.writeHead(200, {'Content-Type': 'application/x-javascript'});
    res.end(html);
});


/*jQuery*/
app.get('/jquery.min.js', function(req, res){
    console.log('GET /jquery.min.js')
    var html = fs.readFileSync('jquery.min.js');
    res.writeHead(200, {'Content-Type': 'application/x-javascript'});
    res.end(html);
});

/*GetIndex*/
app.get('/', function(req, res){
    console.log('GET /')
    var html = fs.readFileSync('index.html');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
});

/*PostIndex*/
app.post('/', function(req, res){
    console.log('POST /');
    console.dir(req.body);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('thanks');
});

port = 3000;
app.listen(port);
console.log('Listening at http://localhost:' + port)