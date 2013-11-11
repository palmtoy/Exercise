var fs = require('fs'),
spawn = require('child_process').spawn,
out = fs.openSync('./out.log', 'a'),
err = fs.openSync('./out.log', 'a');

var child = spawn('node', ['child.js'], {
  detached: true,
  stdio: [ 'ignore', out, err ]
});

child.unref();

setInterval(function(){
  console.log(Date(), 'Father ~ Hi baby ...');
}, 2000);

