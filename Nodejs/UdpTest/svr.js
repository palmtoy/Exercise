var dgram = require('dgram');
var server = dgram.createSocket('udp4');

server.on('message', function(msg, rinfo) {
  console.log('Server got: ' + msg + ' from ' + rinfo.address + ':' + rinfo.port);
});

server.on('listening', function() {
  var address = server.address();
  console.log('Server listening ' + address.address + ':' + address.port);
});

server.bind(8086);

