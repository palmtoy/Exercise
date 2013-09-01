var agent = require('webkit-devtools-agent');
var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(8080, '127.0.0.1');

var x = 0;

var func_lzg = function() {
  for(var i = 0; i < 2000; i++) {
    for(var j = 0; j < 2000; j++) {
      // ... 
    }
  }
  console.log('x = ', x++);
};

setInterval(func_lzg, 1500);

console.log('[%s] Server running at http://127.0.0.1:8080/', process.pid);

