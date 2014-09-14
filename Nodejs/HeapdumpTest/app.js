var heapdump = require('heapdump');

var x = 0;

var foo = function() {
  for(var i = 0; i < 1000; i++) {
    console.log('x = ', x);
  }
  x++;
};

setInterval(foo, 2000);


process.on('SIGUSR2', function() {
  heapdump.writeSnapshot();
});

