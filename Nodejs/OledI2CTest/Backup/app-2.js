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

async function go() {
	oledDisplay.clearDisplay();
	oledDisplay.drawLine(0, 48, 127, 48, 1);

	setInterval(() => {
		const d = new Date();
		const strTime = ( d.getMonth() + 1 ) + '-' + d.getDate() + ' ' + ( d.getDay() === 0 ? 7 : d.getDay() ) + ' ' + d.toTimeString().split(' ')[0]
		oledDisplay.setCursor(0, 50);
		oledDisplay.writeString(fontPack.small_8x12, 1, strTime, 1);
	}, 1000);

	const weatherList = [
		['Today Cloudy', 'Temp -7 / 1', 'Wind 1-2'],
		['2nd-D Sunny', 'Temp -7 / 7', 'Wind 1-2'],
		['3rd-D Sunny', 'Temp -8 / 4', 'Wind 1-2']
	];
	const lenA = weatherList.length;
	while(true) {
		for (let i = 0; i < lenA; i++) {
			const weatherObj = weatherList[i];
			oledDisplay.fillRect(0, 0, 127, 47, 0);
			oledDisplay.setCursor(0, 0);
			oledDisplay.writeString(fontPack.small_8x12, 1, weatherObj[0], 1);
			oledDisplay.setCursor(0, 16);
			oledDisplay.writeString(fontPack.small_8x12, 1, weatherObj[1], 1);
			oledDisplay.setCursor(0, 32);
			oledDisplay.writeString(fontPack.small_8x12, 1, weatherObj[2], 1);
			await sleep(6);
		}
	}
}

go();

