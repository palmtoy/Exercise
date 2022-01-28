const Raspi = require('raspi-io').RaspiIO;
const five = require('johnny-five');
const myEmitter = require('./my-emitter.js');

const G_FORWARD_SPEED = 100;
const G_REVERSE_SPEED = 50;

const board = new five.Board({
	io: new Raspi()
});

board.on('ready', () => {
	// create 2 `motor` hardware instances
	const motorLeft = new five.Motor({
		pins: {
			dir: 'GPIO9',
			pwm: 'GPIO10',
		},
	});

	const motorRight = new five.Motor({
		pins: {
			dir: 'GPIO17',
			pwm: 'GPIO27',
		},
	});

	motorLeft.on('forward', () => {
		console.log(`motorLeft forward: ${new Date().toString()}`);
	});

	motorLeft.on('reverse', () => {
		console.log(`motorLeft reverse: ${new Date().toString()}`);
	});

	motorLeft.on('stop', () => {
		console.log(`motorLeft stop: ${new Date().toString()}`);
	});

	motorRight.on('forward', () => {
		console.log(`motorRight forward: ${new Date().toString()}`);
	});

	motorRight.on('reverse', () => {
		console.log(`motorRight reverse: ${new Date().toString()}`);
	});

	motorRight.on('stop', () => {
		console.log(`motorRight stop: ${new Date().toString()}`);
	});

	myEmitter.on('carGoForward', () => {
		motorLeft.forward(G_FORWARD_SPEED);
		motorRight.forward(G_FORWARD_SPEED);
	});

	myEmitter.on('carGoBack', () => {
		motorLeft.reverse(G_REVERSE_SPEED);
		motorRight.reverse(G_REVERSE_SPEED);
	});

	myEmitter.on('carTurnLeft', () => {
		motorLeft.reverse(G_REVERSE_SPEED);
		motorRight.forward(G_FORWARD_SPEED);
	});
 
	myEmitter.on('carTurnRight', () => {
		motorRight.reverse(G_REVERSE_SPEED);
		motorLeft.forward(G_FORWARD_SPEED);
	});

	const carStop = () => {
		motorLeft.reverse(G_REVERSE_SPEED);
		motorRight.reverse(G_REVERSE_SPEED);
		motorLeft.stop();
		motorRight.stop();
	};

	myEmitter.on('carStop', carStop);

	myEmitter.emit('dcMotorReady');
});

