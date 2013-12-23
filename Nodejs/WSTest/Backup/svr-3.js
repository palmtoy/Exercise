// $ wscat -l 8086

var WebSocketServer = require('ws').Server
  , port = 8086
  , wss = new WebSocketServer({port: port});

var FileReader = require('FileReader');

var msgId = 0;
wss.on('connection', function(ws) {
  ws.on('message', function(buf) {
    console.log('\nisBuffer(buf) = ', Buffer.isBuffer(buf));
    console.log('Received from cli: %d ~ %j', ++msgId, buf);

    var num1 = buf.readFloatLE(0);
    console.log('num1 = ', num1);
    var num2 = buf.readFloatLE(4);
    console.log('num2 = ', num2);
    var num3 = buf.readFloatLE(8);
    console.log('num3 = ', num3);

    // ws.send(msgId + ' ~ ' + buf, {binary: true, mask: false});
    ws.send(buf, {binary: true, mask: false});
  });
});

console.log('WebSocket server is listening on port %s ...', port);

