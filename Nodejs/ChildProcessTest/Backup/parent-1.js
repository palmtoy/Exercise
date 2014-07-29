var child = require('child_process').fork('child.js');

var server = require('net').createServer();
server.on('connection', function(socket) {
  socket.end('Handled by PARENT.\n');
});

server.listen(1337, function() {
  child.send('server', server);
  console.log('Please use this cmd: curl "http://localhost:1337"');
});
