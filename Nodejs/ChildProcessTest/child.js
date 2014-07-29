var http = require('http');
var server = http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Handled by CHILD, pid is ' + process.pid + '\n');
});

process.on('message', function(m, tcp) {
  if(m == 'server') {
    tcp.on('connection', function(socket) {
      server.emit('connection', socket);
    });
  }
});

console.log('I\'m a child process, my pid is ' + process.pid + '\n');
