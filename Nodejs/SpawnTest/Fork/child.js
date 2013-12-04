/*
setInterval(function(){
  console.log(Date(), 'Child  ~ I am here.');
}, 2000);
*/


process.on('message', function(m) {
  console.log(' Child got message:', m);
  process.exit(0);
});

process.send({ FromChild: 'I am here ...' });

