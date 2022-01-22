#!/usr/bin/env node

const Raspi = require('raspi-io').RaspiIO;
const five = require('johnny-five');

const G_MAX_LOOP_NUM = 1;
const G_SLEEP_TIME = 1.5 * 1000; // unit: ms
const G_MAX_DEGREE = 180;

async function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

const board = new five.Board({
	io: new Raspi()
});

board.on('ready', async () => {
	console.log(`${new Date().toString()} ~ Connected`);

	// Initialize the servo instance
	const servo = new five.Servo({
		controller: 'PCA9685',
		pin: 0,
		invert: false,
		// invert: true,
		range: [0, G_MAX_DEGREE],
		deviceRange: [0, G_MAX_DEGREE],
		startAt: 0,
		center: false,
	});

	// degree is a Number, exp. 0, 90, 180
	const funcServoTo = async (dgrees) => {
		servo.to(dgrees);
		console.log(`${new Date().toString()} ~ Set the servo to the ${dgrees} degrees`);
		await sleep(G_SLEEP_TIME);
	};

	let loopNum = 0;
	while(true) {
		for (let d = 0; d <= G_MAX_DEGREE; d += 15) {
			await funcServoTo(d);
		}
		for (let d = G_MAX_DEGREE; d >= 0; d -= 15) {
			await funcServoTo(d);
		}
		if (++loopNum >= G_MAX_LOOP_NUM) {
			await funcServoTo(0);
			process.exit();	
		}
	}

	board.on('exit', () => {
		servo.stop();
	});
});

