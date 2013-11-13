/*
var spawn = require('child_process').spawn;

var child = spawn('node', ['child.js'], {
  detached: true,
  stdio: 'inherit'
});

child.unref();

setInterval(function(){
  console.log(Date(), 'Father ~ Hi baby ...');
}, 2000);
*/

var child_process = require('child_process');
var n = child_process.fork('./child.js');

n.on('message', function(m) {
  console.log('Father got message:', m);
  process.exit(0);
});

n.send({ FromFather: 'hi, baby ~' });

