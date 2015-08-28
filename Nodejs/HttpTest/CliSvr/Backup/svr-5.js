/*
curl -v http://127.0.0.1:8080
*/

var http = require('http');
var url = require('url');

var n = 0;

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});

  var queryData = url.parse(req.url, true).query;
  console.log(++n + ': queryData =' , JSON.stringify(queryData));
  var now = new Date() + ' ~ ';
  if (queryData.name) {
    res.end(n + ' -> ' + now + 'Hello ' + queryData.name + '\n');
  } else {
    res.end(n + ' -> ' + now + 'Hello World\n');
  }
}).listen(8080, '127.0.0.1');

console.log('Server running at http://127.0.0.1:8080/');
