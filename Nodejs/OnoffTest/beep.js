#!/usr/bin/env node

// In RaspberryPi -- $ pinout

const Gpio = require('onoff').Gpio; // Gpio class
const ledYellow = new Gpio(7, 'out'); // Export GPIO-7 as an output

const G_ON = 1;
const G_OFF = 0;

const G_YELLOW_LIGHTING_TIME = 500; // ms

const G_YELLOW_BLINK_NUM = 3;


async function sleep(interval) {
	return new Promise(resolve => setTimeout(resolve, interval));
}

async function lightenLedYellow(duration, blinkNum) {
	for(let i = 0; i < blinkNum; i++) {
		ledYellow.write(G_ON);
		await sleep(duration);
		ledYellow.write(G_OFF);
		await sleep(duration);
	}
}

// Unexport GPIO and free resources
function freeAllLedResources() {
	ledYellow.unexport();
}

process.on('SIGINT', () => {
  console.log(`\nGracefully shutting down from SIGINT (Crtl-C) ~ ${new Date().toString()}`);
	freeAllLedResources();
	process.exit(0);
});


( async () => {
  	console.log(`Red / Yellow / Green led lights are blinking ~ ${new Date().toString()} ...`);
		while(true) {
			await lightenLedYellow(G_YELLOW_LIGHTING_TIME, G_YELLOW_BLINK_NUM);
		}
	}
)();

