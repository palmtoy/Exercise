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

	motorLeft.on('start', () => {
		console.log(`start: ${new Date().toString()}`);
	});

	motorLeft.on('stop', () => {
		console.log(`\nstop: ${new Date().toString()}`);
	});

	motorLeft.on('forward', () => {
		console.log(`forward: ${new Date().toString()}`);
		board.wait(G_RUN_TIME, () => motorLeft.reverse(G_REVERSE_SPEED));
	});

	motorRight.on('start', () => {
		console.log(`start: ${new Date().toString()}`);
	});

	motorRight.on('stop', () => {
		console.log(`\nstop: ${new Date().toString()}`);
	});

	motorRight.on('forward', () => {
		console.log(`forward: ${new Date().toString()}`);
		board.wait(G_RUN_TIME, () => motorRight.reverse(G_REVERSE_SPEED));
	});

	let loopNumLeft = 0;
	motorLeft.on('reverse', () => {
		console.log(`reverse: ${new Date().toString()}`);
		board.wait(G_RUN_TIME, () => {
			if (++loopNumLeft >= G_MAX_LOOP_NUM) {
				motorLeft.stop();
				process.exit(0);
			} else {
				motorLeft.forward(G_FORWARD_SPEED);
			}
		});
	});

	let loopNumRight = 0;
	motorRight.on('reverse', () => {
		console.log(`reverse: ${new Date().toString()}`);
		board.wait(G_RUN_TIME, () => {
			if (++loopNumRight >= G_MAX_LOOP_NUM) {
				motorRight.stop();
				process.exit(0);
			} else {
				motorRight.forward(G_FORWARD_SPEED);
			}
		});
	});

	motorLeft.forward(G_FORWARD_SPEED);
	motorRight.forward(G_FORWARD_SPEED);
});

