#!/usr/bin/env node

const os = require('os');
const axios = require('axios');
const oledDisplay = require('./oled-display.js');

const G_QWEATHER_TOKEN = require(`${os.homedir()}/.ssh/qweather_token.json`);
const G_QWEATHER_INTERVAL = 10 * 60 * 1000; // unit: minute(s)
const G_LOC_CHANGPING = '101010700'; // Beijing, Changping
const CODE_OK = 200;


const axiosObj = axios.create({
	baseURL: 'https://devapi.qweather.com/',
	timeout: 6 * 1000, // unit: second(s)
	headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
});


async function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}


async function fetchWeatherData() {
	let weatherData = {};
	try {
		// https://devapi.qweather.com/v7/weather/now?
		// https://devapi.qweather.com/v7/weather/3d?
		// const url = `/v7/weather/now`;
		const url = `/v7/weather/3d`;
		const reqConfig = {
			params: { location: G_LOC_CHANGPING, lang: 'en', key: G_QWEATHER_TOKEN.key }
		};
		const res = await axiosObj.get(url, reqConfig);
		if (res && res.status === CODE_OK) {
			// console.log(`res.data =`, JSON.stringify(res.data));
			if (res && res.data && res.data.code === CODE_OK.toString()) {
				weatherData = res.data.daily || res.data.now;
				console.log(`weatherData = ${JSON.stringify(weatherData)}`, );
			}
		}
	} catch (error) {
		console.error('\n_fetchWeatherData throw an Error ...');
		console.error(error);
	}
	return weatherData;
}

function setWeatherListToOled(weatherData) {
	const weatherList = [];
	for (let i = 0; i < weatherData.length; i++) {
		const w = weatherData[i];
		let firstLine = w.textDay;
		switch(i) {
			case 0:
				firstLine = 'Today ' + firstLine;
				break;
			case 1:
				firstLine = '2nd-D ' + firstLine;
				break;
			case 2:
				firstLine = '3rd-D ' + firstLine;
				break;
		}
		const secondLine = 'Temp ' + w.tempMin + ' / ' + w.tempMax;
		const thirdLine = 'Wind ' + w.windScaleDay;
		weatherList.push([ firstLine, secondLine, thirdLine]);
	}
	oledDisplay.setWeatherList(weatherList);
}


async function go() {
	while(true) {
		const now = new Date();
		console.log(`\n${now.toString()} ~ _go start to fetch weather data ...`);
		const weatherData = await fetchWeatherData();
		setWeatherListToOled(weatherData);
		await sleep(G_QWEATHER_INTERVAL);
	}
}


(
	async () => {
		await go();
	}
)();

