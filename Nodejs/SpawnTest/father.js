var fs = require('fs'),
    spawn = require('child_process').spawn,

var child = spawn('node', ['child.js'], {
  detached: true,
  stdio: 'inherit'
});

child.unref();

setInterval(function(){
  console.log(Date(), 'Father ~ Hi baby ...');
}, 2000);

