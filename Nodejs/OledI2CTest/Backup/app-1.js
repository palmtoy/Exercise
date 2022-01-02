#!/usr/bin/env node

const i2c = require('i2c-bus');
const oledI2c = require('oled-i2c-bus');

const opts = {
	width: 128,
	height: 64,
	address: 0x3c
};

const i2cBus = i2c.openSync(1);
const oled = new oledI2c(i2cBus, opts);

oled.clearDisplay();

oled.drawPixel([
	[0, 0, 1],
	[127, 0, 1],
	[0, 63, 1],
	[127, 63, 1],
]);

oled.drawLine(0, 0, 127, 63, 1);
oled.drawLine(0, 63, 127, 0, 1);

oled.drawLine(63, 0, 63, 63, 1);
oled.drawLine(0, 31, 127, 31, 1);

