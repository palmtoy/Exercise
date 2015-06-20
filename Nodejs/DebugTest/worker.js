// run me: DEBUG=* node worker.js > out &

var debug = require('debug')('worker');

setInterval(function(){
	debug('doing some work');
}, 1000);
