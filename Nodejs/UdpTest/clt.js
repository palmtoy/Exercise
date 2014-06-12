var dgram = require('dgram');
var client = dgram.createSocket('udp4');

var message = new Buffer('Hi, baby ~');

client.send(message, 0, message.length, 8086, 'localhost', function(err, bytes) {
  client.close();
});

