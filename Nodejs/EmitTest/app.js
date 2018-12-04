const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on('my-event', (a, b) => {
	console.log(a, b, this); // a b {}
});

myEmitter.emit('my-event', 'a', 'b');


const anotherEmitter = new MyEmitter();

anotherEmitter.emit('my-event', 'c', 'd'); // nothing will happen

