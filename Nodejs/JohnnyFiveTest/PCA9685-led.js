#!/usr/bin/env node

const Raspi = require('raspi-io').RaspiIO;
const five = require('johnny-five');
const board = new five.Board({
	io: new Raspi()
});

board.on('ready', () => {
	const ledObj = new five.Led({
		pin: 0, // Servo ( S1 - S8 ) : GVS : [ 0, 1, 14, 15, 9, 12, 3, 6 ]
		address: 0x60,
		controller: 'PCA9685'
	});

	ledObj.pulse(1500);
	console.log(new Date().toString());
});

