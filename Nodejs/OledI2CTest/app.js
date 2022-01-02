#!/usr/bin/env node

const i2c = require('i2c-bus');
const oledI2c = require('oled-i2c-bus');

const opts = {
	width: 128,
	height: 64,
	address: 0x3C
};

const i2cBus = i2c.openSync(1);
const oled = new oledI2c(i2cBus, opts);

oled.clearDisplay();
oled.drawLine(1, 1, 128, 64, 1);

