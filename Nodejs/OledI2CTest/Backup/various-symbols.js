#!/usr/bin/env node

const i2c = require('i2c-bus');
const oledI2c = require('oled-i2c-bus');
const fontPack = require('oled-font-pack');

const opts = {
	width: 128,
	height: 64,
	address: 0x3c
};

const i2cBus = i2c.openSync(1);
const oledDisplay = new oledI2c(i2cBus, opts);

async function sleep(interval) {
	return new Promise(resolve => setTimeout(resolve, interval * 1000));
}

const G_FONT = fontPack.various_symbols_16x16;

async function go() {
	oledDisplay.clearDisplay();

	const weatherList = [
		['0123456', '789abcd', 'efghijk'],
		['lmnopqr', 'stuvwxy', 'zABCDEF'],
		['GHIJKLM', 'NOPQRST', 'UVWXYZ~'],
		['!@#$%^&', '*()_+{}', '|:"<>?`'],
		['-=[]\\;\'', ',./', ''],
	];
	const lenA = weatherList.length;
	while(true) {
		for (let i = 0; i < lenA; i++) {
			const weatherObj = weatherList[i];
			oledDisplay.fillRect(0, 0, 127, 63, 0);
			oledDisplay.setCursor(0, 0);
			oledDisplay.writeString(G_FONT, 1, weatherObj[0], 1);
			oledDisplay.setCursor(0, 17);
			oledDisplay.writeString(G_FONT, 1, weatherObj[1], 1);
			oledDisplay.setCursor(0, 34);
			oledDisplay.writeString(G_FONT, 1, weatherObj[2], 1);
			await sleep(6);
		}
	}
}

go();

