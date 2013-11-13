var spawn = require('child_process').spawn;
var child = spawn('node', ['child.js'], {detached: true, stdio:'inherit'}); 

setInterval(function(){
  child.kill('SIGINT');
}, 2000);

child.on('exit', function(code, signal){
  console.log('process exit ' + code + ' ' + signal);
});

// child.stdout.pipe(process.stdout);

