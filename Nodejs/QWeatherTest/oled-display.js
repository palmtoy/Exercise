#!/usr/bin/env node

const i2c = require('i2c-bus');
const oledI2c = require('oled-i2c-bus');
const fontPack = require('oled-font-pack');
const G_WEATHER_LIST = [];
const G_SLEEP_INTERVAL = 6; // unit: second

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
		let strYear = d.getFullYear().toString();
		let strMonth = ( d.getMonth() + 1 ).toString();
		if (strMonth.length === 1) {
			strMonth = '0' + strMonth;
		}
		let strDate = d.getDate().toString();
		if (strDate.length === 1) {
			strDate = '0' + strDate;
		}
		let numDay = d.getDay();
		if (numDay === 0) {
			numDay = 7;
		}
		let strDay = numDay.toString();
		const strTime = d.toTimeString().split(' ')[0];
		// const strDateTime = strMonth + '-' + strDate + ' ' + strDay + ' ' + strTime;
		const strDateTime = strYear + '-' + strMonth + '-' + strDate + ' ' + strDay + ' ' + strTime;
		oledDisplay.setCursor(0, 53);
		oledDisplay.writeString(fontPack.oled_5x7, 1, strDateTime, 1);
	}, 1000);

	while(true) {
		const lenA = G_WEATHER_LIST.length;
		for (let i = 0; i < lenA; i++) {
			const weatherObj = G_WEATHER_LIST[i];
			oledDisplay.fillRect(0, 0, 127, 47, 0);
			oledDisplay.setCursor(0, 0);
			oledDisplay.writeString(fontPack.small_8x12, 1, weatherObj[0], 1);
			oledDisplay.setCursor(0, 16);
			oledDisplay.writeString(fontPack.small_8x12, 1, weatherObj[1], 1);
			oledDisplay.setCursor(0, 32);
			oledDisplay.writeString(fontPack.small_8x12, 1, weatherObj[2], 1);
			await sleep(G_SLEEP_INTERVAL);
		}
		if (lenA <= 0) {
			await sleep(G_SLEEP_INTERVAL);
		}
	}
}

go();


module.exports = {
	setWeatherList: (weatherList) => {
		if (weatherList && weatherList.length > 0) {
			G_WEATHER_LIST.splice(0);
			weatherList.forEach(w => {
				G_WEATHER_LIST.push(w);
			});
		}
	}
}

