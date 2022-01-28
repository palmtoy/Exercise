#!/usr/bin/env node

const Raspi = require('raspi-io').RaspiIO;
const five = require('johnny-five');

const G_MAX_LOOP_NUM = 3;
const G_SLEEP_TIME = 2 * 1000; // unit: ms

async function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

const board = new five.Board({
	io: new Raspi()
});

board.on('ready', async () => {
	const servo = new five.Servo({
		pin: 'GPIO26',
		invert: false,
		// invert: true,
		range: [0, 180],
		startAt: 0,
		center: false,
	});

	// degree is a Number, exp. 0, 90, 180
	const funcServoTo = async (dgrees) => {
		servo.to(2 * dgrees);
		console.log(`${new Date().toString()} ~ Set the servo to the ${dgrees} degrees`);
		await sleep(G_SLEEP_TIME);
	};

	let loopNum = 0;
	while(true) {
		await funcServoTo(0);
		await funcServoTo(45);
		await funcServoTo(90);
		await funcServoTo(45);
		if (++loopNum >= G_MAX_LOOP_NUM) {
			await funcServoTo(0);
			process.exit();	
		}
	}

	board.on('exit', () => {
		servo.stop();
	});
});

