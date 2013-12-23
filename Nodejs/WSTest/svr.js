// $ wscat -l 8086

var WebSocketServer = require('ws').Server
  , port = 8086
  , wss = new WebSocketServer({port: port});

var msgId = 0;
wss.on('connection', function(ws) {
  var self = this;
  var headLen = 4
    , itemLen = 4;

  ws.on('message', function(buf) {
    console.log('\nisBuffer(buf) = ', Buffer.isBuffer(buf));
    console.log('Received from cli: %d ~ %j', ++msgId, buf);

    var len = buf.readInt32BE(0);
    console.log('len = ', len);
    var offset = 0;
    var body = [];
    for(var i = 0; i < len; ++i) {
      body.push(buf.readFloatBE(headLen + offset * itemLen));
      ++offset;
    }
    console.log('body = %j', body);

    var sum = 0;
    for(var k in body) {
      sum += body[k];
    }
    console.log('sum = ', sum);

    try {
      // broadcast
      for(var i in self.clients) {
        self.clients[i].send(msgId + ' ~ ' + sum.toString(), {mask: true});
      }
    } catch(err) {
      throw err;
    }
  });
});

console.log('WebSocket server is listening on port %s ...', port);

