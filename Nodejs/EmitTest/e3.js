var events = require('events');
var util = require('util');

function Door(colour) {
	this.colour = colour;
	events.EventEmitter.call(this);

	this.open = function()
	{
		this.emit('open');
	}
}

util.inherits(Door, events.EventEmitter);
// Door.prototype.__proto__ = events.EventEmitter.prototype;

var frontDoor = new Door('brown');

/*
frontDoor.on('open', function() {
	console.log('ring ring ring ~');
});

frontDoor.open();
*/

var ring = function()
{
    console.log('ring~');
}
frontDoor.on('open', ring);
frontDoor.on('open', function() {
	console.log('hi');
});

console.log(Object.keys(frontDoor.listeners('open')));

console.log(util.inspect(frontDoor.listeners('open'))); // Outputs ring 

frontDoor.open();

frontDoor.removeListener('open', ring);
// frontDoor.removeAllListeners('open');

frontDoor.open();

/*
output:

[ '0', '1' ]
[ [Function], [Function] ]
ring~
hi
hi
*/
