var net = require('net');
var Composer = require('stream-pkg');

var server = net.createServer(function(socket) {
  var composer = new Composer();

  composer.on('data', function(pkg) {
    console.log('package receive: %j', pkg.toString());
    socket.write(composer.compose(pkg));
  });

  socket.on('data', function(data) {
    composer.feed(data);
  });

  socket.on('end', function(data) {
    composer.feed(data);
    socket.end();
    server.close();
  });
});

server.listen(8888);
