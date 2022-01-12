#!/usr/bin/env node

// In RaspberryPi -- $ pinout

const Gpio = require('pigpio').Gpio;

// GPIO1 -- the yellow LED
const led = new Gpio(7, {mode: Gpio.OUTPUT});

let dutyCycle = 0;

setInterval(() => {
	led.pwmWrite(dutyCycle);

	dutyCycle += 1;
	if (dutyCycle > 255) {
		dutyCycle = 0;
	}
}, 60);

