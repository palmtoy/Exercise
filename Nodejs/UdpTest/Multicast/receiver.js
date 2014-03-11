var dgram = require('dgram');
var socket = dgram.createSocket('udp4');

socket.bind(7400, '0.0.0.0', function() {
  socket.addMembership('239.255.0.1', '0.0.0.0');
  socket.setMulticastLoopback(true);
});

socket.on('message', function() {
  console.log(Date.now(), ' : get message', arguments);
});

console.log('I\'m receiving ...\n');

process.on('uncaughtException', function(e) {
  console.log(e);
});

