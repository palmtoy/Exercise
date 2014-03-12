var events = require('events');

var eventEmitter = new events.EventEmitter();

var ringBell = function ringBell()
{
  console.log('ring ring ring');
}

var sayHi = function sayHi()
{
  console.log('Hi~');
}

eventEmitter.on('doorOpen', ringBell);
eventEmitter.on('doorOpen', sayHi);
eventEmitter.on('doorOpen', function(ring)
	{
		console.log(ring);
	}
);

eventEmitter.emit('doorOpen', 'ringeling');

// eventEmitter.emit('doorOpen');

/*
output:

ring ring ring
Hi~
ringeling
*/
