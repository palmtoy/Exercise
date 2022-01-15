#!/usr/bin/env node

const Raspi = require('raspi-io').RaspiIO;
const five = require('johnny-five');

const G_FORWARD_SPEED = 100;
const G_REVERSE_SPEED = 50;
const G_RUN_TIME = 3 * 1000; // unit: ms
const G_MAX_LOOP_NUM = 3;

const board = new five.Board({
	io: new Raspi()
});

board.on('ready', () => {
	// Create a new `motor` hardware instance.
	const motor = new five.Motor({
		pins: {
			dir: 'GPIO17',
			pwm: 'GPIO27',
		},
	});

	motor.on('start', () => {
		console.log(`start: ${new Date().toString()}`);
	});

	motor.on('stop', () => {
		console.log(`\nstop: ${new Date().toString()}`);
	});

	motor.on('forward', () => {
		console.log(`forward: ${new Date().toString()}`);
		// demonstrate switching to reverse
		board.wait(G_RUN_TIME, () => motor.reverse(G_REVERSE_SPEED));
	});

	let loopNum = 0;
	motor.on('reverse', () => {
		console.log(`reverse: ${new Date().toString()}`);
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

