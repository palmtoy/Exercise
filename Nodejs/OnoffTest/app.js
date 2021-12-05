#!/usr/bin/env node

// In RaspberryPi -- $ pinout

const Gpio = require('onoff').Gpio; // Gpio class
const ledRed = new Gpio(1, 'out'); // Export GPIO-1 as an output
const ledYellow = new Gpio(7, 'out'); // Export GPIO-7 as an output
const ledGreen = new Gpio(8, 'out'); // Export GPIO-8 as an output

const G_ON = 1;
const G_OFF = 0;

const G_RED_LIGHTING_TIME = 3 * 1000; // 3s
const G_YELLOW_LIGHTING_TIME = 500; // 500ms
const G_GREEN_LIGHTING_TIME = 3 * 1000; // 3s

const G_YELLOW_BLINK_NUM = 3;


async function sleep(interval) {
	return new Promise(resolve => setTimeout(resolve, interval));
}

async function lightenLedRed(duration) {
	ledRed.write(G_ON);
	await sleep(duration);
	ledRed.write(G_OFF);
}

async function lightenLedYellow(duration, blinkNum) {
	for(let i = 0; i < blinkNum; i++) {
		ledYellow.write(G_ON);
		await sleep(duration);
		ledYellow.write(G_OFF);
		await sleep(duration);
	}
}

async function lightenLedGreen(duration) {
	ledGreen.write(G_ON);
	await sleep(duration);
	ledGreen.write(G_OFF);
}


// Unexport GPIO and free resources
function freeAllLedResources() {
	ledRed.unexport();
	ledYellow.unexport();
	ledGreen.unexport();
}

process.on('SIGINT', () => {
  console.log(`\nGracefully shutting down from SIGINT (Crtl-C) ~ ${new Date().toString()}`);
	freeAllLedResources();
	process.exit(0);
});


( async () => {
  	console.log(`Red / Yellow / Green led lights are blinking ~ ${new Date().toString()} ...`);
		while(true) {
			await lightenLedRed(G_RED_LIGHTING_TIME);
			await lightenLedYellow(G_YELLOW_LIGHTING_TIME, G_YELLOW_BLINK_NUM);
			await lightenLedGreen(G_GREEN_LIGHTING_TIME);
			await lightenLedYellow(G_YELLOW_LIGHTING_TIME, G_YELLOW_BLINK_NUM);
		}
	}
)();

