var repl = require('repl');
var net = require('net');
 
var port = 8080;

net.createServer(function (socket) {
  var r = repl.start({
    prompt: 'socket ' + socket.remoteAddress + ':' + socket.remotePort + '> ',
    input: socket,
    output: socket,
    terminal: true,
    useGlobal: false
  });
  r.on('exit', function () {
    socket.end();
  });
  r.context.socket = socket;
}).listen(port);

console.log('TCP svr is running, port:' + port);
