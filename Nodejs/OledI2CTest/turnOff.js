#!/usr/bin/env node

const i2c = require('i2c-bus');
const oled = require('oled-i2c-bus');

const i2cBus = i2c.openSync(1);

const opts = {
	width: 128,
	height: 64,
	address: 0x3c
};

const oledDisplay = new oled(i2cBus, opts);

oledDisplay.clearDisplay();
oledDisplay.turnOffDisplay();

