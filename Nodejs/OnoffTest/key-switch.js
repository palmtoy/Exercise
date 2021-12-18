#!/usr/bin/env node
// In RaspberryPi -- $ pinout

const Gpio = require('onoff').Gpio; // Gpio class
const { blinkRYGLightsOneRound } = require('./red-green-light');

const button = new Gpio(16, 'in', 'falling', {debounceTimeout: 10});
let G_IS_BLINKING = false;
const G_BLINKING_INTERVAL = 30 * 1000; // 10s
let G_TIMEOUT_OBJ = null;

function setResetBlinkingFlag () {
	G_IS_BLINKING = true;
	G_TIMEOUT_OBJ = setTimeout( () => {
		G_IS_BLINKING = false;
	}, G_BLINKING_INTERVAL);
}

button.watch(async (err, value) => {
  if (err) {
		console.log(`${new Date().toString()} ~ "${err.message}"\n${err.stack}`);
  }

	console.log(`${new Date().toString()} ~ The button has been pressed.`);

	if (G_IS_BLINKING) {
		console.log(`${new Date().toString()} ~ _blinkRYGLightsOneRound is still running, please wait for a while ...`);
		return;
	}

	setResetBlinkingFlag();
 	await blinkRYGLightsOneRound();
	if (G_TIMEOUT_OBJ) {
		clearTimeout(G_TIMEOUT_OBJ);
		G_TIMEOUT_OBJ = null;
		G_IS_BLINKING = false;
	}
});

console.log(`${new Date().toString()} ~ key-switch is running ...`);

process.on('SIGINT', _ => {
  button.unexport();
});

