// $ wscat -l 8086

var WebSocketServer = require('ws').Server
  , port = 8086
  , wss = new WebSocketServer({port: port});

var FileReader = require('FileReader');

var msgId = 0;
wss.on('connection', function(ws) {
  ws.on('message', function(msg) {
    console.log('Received from cli: %d ~ %j', ++msgId, msg);
    // ws.send(msgId + ' ~ ' + msg, {binary: true, mask: false});
    ws.send(msg, {binary: true, mask: false});
  });
});

console.log('WebSocket server is listening on port %s ...', port);

