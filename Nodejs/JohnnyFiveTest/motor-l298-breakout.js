#!/usr/bin/env node

const Raspi = require('raspi-io').RaspiIO;
const five = require('johnny-five');

const G_FORWARD_SPEED = 100;
const G_REVERSE_SPEED = 100;
const G_RUN_TIME = 3 * 1000; // unit: ms
const G_MAX_LOOP_NUM = 5;

const board = new five.Board({
	io: new Raspi()
});

board.on('ready', () => {
	// Create a new `motor` hardware instance.
	const motor = new five.Motor({
		pins: {
			pwm: 'GPIO17',
			dir: 'GPIO27',
		},
	});

	motor.on('start', () => {
		console.log(`start: ${Date.now()}`);
	});

	motor.on('stop', () => {
		console.log(`automated stop on timer: ${Date.now()}`);
	});

	motor.on('forward', () => {
		console.log(`forward: ${Date.now()}`);
		// demonstrate switching to reverse after 5 seconds
		board.wait(G_RUN_TIME, () => motor.reverse(G_REVERSE_SPEED));
	});

	let loopNum = 0;
	motor.on('reverse', () => {
		console.log(`reverse: ${Date.now()}`);
		// demonstrate stopping after 5 seconds
		board.wait(G_RUN_TIME, () => {
			if (++loopNum >= G_MAX_LOOP_NUM) {
				motor.stop();
				process.exit(0);
			} else {
				motor.forward(G_FORWARD_SPEED);
			}
		});
	});

	motor.forward(G_FORWARD_SPEED);
});

