var zmq = require('zmq')
  , sock = zmq.socket('push');

sock.bindSync('tcp://127.0.0.1:3000');
console.log('Producer bound to port 3000');

var i = 0;
setInterval(function(){
  ++i;
  console.log(Date() + 'sending work : ' + i);
  sock.send(Date() + 'some work : ' + i);
}, 2000);

