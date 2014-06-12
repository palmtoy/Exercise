var net = require('net');

var HOST = '127.0.0.1';
var PORT = 6969;

net.createServer(function(sock) {
  sock.write('Echo server.\n');

  sock.pipe(sock);
}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);

