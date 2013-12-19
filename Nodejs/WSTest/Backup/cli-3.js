// $ wscat -c ws://localhost:8086

var WebSocket = require('ws')
  , ws = new WebSocket('ws://localhost:8086/');

var intervalId = null;

ws.on('open', function() {
  console.log('Connected to server.');

  function sendArray() {
    var array = new Float32Array(3);
    for (var i = 0; i < array.length; ++i) array[i] = Math.round(Math.random() * 0xFF) / 9;
    try {
      ws.send(array, {binary: true, mask: false});
    } catch(err) {
      throw err;
    }
    console.log('Send %j to svr ...', array);
  }

  intervalId = setInterval(sendArray, 1500);
});

ws.on('message', function(message) {
  console.log('\nEcho from svr: %j', message);
  console.log('====================================\n');
});

ws.on('close', function() {
  if(!!intervalId) {
    clearInterval(intervalId);
  }
  console.log('Disconnected from svr.');
});

process.on('uncaughtException', function(err) {
  console.error('Caught exception: ' + err.stack);
});

