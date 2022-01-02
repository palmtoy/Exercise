#!/usr/bin/env node

const png2lcd = require('png-to-lcd');
const i2c = require('i2c-bus');
const oledI2c = require('oled-i2c-bus');

const opts = {
	width: 128,
	height: 64,
	address: 0x3D
};

const i2cBus = i2c.openSync(1);
const oled = new oledI2c(i2cBus, opts);

png2lcd('./icons/301.png', true, function(err, bitmap) {
  oled.buffer = bitmap;
  oled.update();
});

