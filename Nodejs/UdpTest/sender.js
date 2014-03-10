var dgram = require('dgram');
var socket = dgram.createSocket('udp4');

socket.bind(7400, '0.0.0.0', function() {
  socket.addMembership('239.255.0.1', '0.0.0.0');
  socket.setMulticastLoopback(true);
});

setInterval(function() {
  socket.send(new Buffer('abcdefgh'), 0, 5, 7400, '239.255.0.1');
}, 1000);

console.log('I\'m sending ...\n');

process.on('uncaughtException', function(e) {
  console.log(e);
});

