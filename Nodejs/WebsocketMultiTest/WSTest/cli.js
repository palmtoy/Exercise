#!/usr/bin/env node

// remove tls rejections
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

var WebSocket = require('ws');
var wss = new WebSocket('wss://localhost:8068/', {rejectUnauthorized: false});

var intervalId = null;

wss.on('open', function() {
  console.log('Connected to server.');
  var headLen = 4
    , itemLen = 4;

  function sendArray() {
    var len = Math.floor((Math.random() * 5) + 1);

    var head = new Int32Array([len]);

    var body = new Float32Array(len);
    for (var i = 0; i < body.length; ++i) {
      body[i] = Math.round(Math.random() * 0xFF) / 3;
    }
    console.log('body = %j', body);

    var buf = new Buffer(headLen + itemLen * len);
    buf.writeInt32BE(head[0], 0);

    var offset = 0;
    for(var i = 0; i < len; ++i) {
      buf.writeFloatBE(body[i], headLen + offset * itemLen);
      ++offset;
    }

    try {
      wss.send(buf, {binary: true, mask: true});
    } catch(err) {
      throw err;
    }

    console.log('Send %j to svr ...', buf);
  }

  intervalId = setInterval(sendArray, 1500);
});

wss.on('message', function(message) {
  console.log('\nEcho from svr: %s', message);
  console.log('====================================\n');
});

wss.on('close', function() {
  if(!!intervalId) {
    clearInterval(intervalId);
  }
  console.log('Disconnected from svr.');
});

process.on('uncaughtException', function(err) {
  console.error('Caught exception: ' + err.stack);
});

