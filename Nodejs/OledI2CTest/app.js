#!/usr/bin/env node

const fs = require('fs');
const PNG = require('pngjs').PNG;
const i2c = require('i2c-bus');
const oled = require('oled-i2c-bus');

var i2cBus = i2c.openSync(1);

var opts = {
	width: 128,
	height: 64,
	address: 0x3c
};

var oledDisplay = new oled(i2cBus, opts);

oledDisplay.clearDisplay();

const pngPath = './panther.png';

fs.createReadStream(pngPath)
.pipe(new PNG({ filterType: 4 }))
.on('parsed', function () {
	oledDisplay.drawRGBAImage(this, 0, 0);
});

