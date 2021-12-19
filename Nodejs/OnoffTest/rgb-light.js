#!/usr/bin/env node

// In RaspberryPi -- $ pinout

const Gpio = require('onoff').Gpio; // Gpio class
const ledRed = new Gpio(1, 'out'); // Export GPIO-1 as an output
const ledGreen = new Gpio(8, 'out'); // Export GPIO-8 as an output
const ledBlue = new Gpio(7, 'out'); // Export GPIO-7 as an output

const G_ON = 0;
const G_OFF = 1;

const G_COLOR_LIST = [
	[G_ON, G_OFF, G_OFF, 'Red'], [G_OFF, G_ON, G_OFF, 'Green'], [G_OFF, G_OFF, G_ON, 'Blue'],
	[G_ON, G_ON, G_OFF, 'Yellow'], [G_ON, G_OFF, G_ON, 'Purple'], [G_OFF, G_ON, G_ON, 'Cyan'],
	[G_ON, G_ON, G_ON, 'White'], [G_OFF, G_OFF, G_OFF, 'None']
];
const G_LIGHTING_TIME = 1 * 1000; // unit: s


async function sleep(interval) {
	return new Promise(resolve => setTimeout(resolve, interval));
}

async function lightenRainbowLed(colorList, duration) {
	ledRed.write(colorList[0]);
	ledGreen.write(colorList[1]);
	ledBlue.write(colorList[2]);
	console.log(`${new Date().toString()} ~ _lightenRainbowLed [${colorList[3]}] is running ...`);
	await sleep(duration);
}

// Unexport GPIO and free resources
function freeAllLedResources() {
	ledRed.unexport();
	ledBlue.unexport();
	ledGreen.unexport();
}

process.on('SIGINT', () => {
  console.log(`\nGracefully shutting down from SIGINT (Crtl-C) ~ ${new Date().toString()}`);
	freeAllLedResources();
	process.exit(0);
});


( async () => {
  	console.log(`RGB 3 color led light is blinking ~ ${new Date().toString()} ...`);
		while(true) {
			for (let i = 0; i < G_COLOR_LIST.length; i++) {
				await lightenRainbowLed(G_COLOR_LIST[i], G_LIGHTING_TIME);
			}
		}
	}
)();

