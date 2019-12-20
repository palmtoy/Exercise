// $ wscat -l 8086

var WebSocketServer = require('ws').Server
  , port = 8086
  , wss = new WebSocketServer({port: port});

var msgId = 0;
wss.on('connection', function(ws) {
  ws.on('message', function(message) {
    console.log('Received from cli: %d ~ %s', ++msgId, message);
    ws.send(msgId + ' ~ ' + message);
  });
});

console.log('WebSocket server is listening on port %s ...', port);

