// $ wscat -c ws://localhost:8086

var WebSocket = require('ws')
  , ws = new WebSocket('ws://localhost:8086/');

var intervalId = null;

ws.on('open', function() {
  console.log('Connected to server.');

  function sendNumber() {
    var number = Math.round(Math.random() * 0xFFFFFF);
    number = number.toString();
    try {
      ws.send(number);
    } catch(err) {
      throw err;
    }
    console.log('Send %d to svr ...', number);
  }

  intervalId = setInterval(sendNumber, 1500);
});

ws.on('message', function(message) {
  console.log('Echo from svr: %s', message);
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

