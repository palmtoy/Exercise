// process.stdin.resume();

process.on('SIGINT', function() {
  console.log('Got SIGINT from father. Press Control-C to exit.');
});

setInterval(function(){
  console.log('I am a child.');
}, 2000);

