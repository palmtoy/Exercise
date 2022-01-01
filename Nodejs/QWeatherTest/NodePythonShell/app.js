#!/usr/bin/env node

const os = require('os');
const axios = require('axios');
const { PythonShell } = require('python-shell');

const G_QWEATHER_TOKEN = require(`${os.homedir()}/.ssh/qweather_token.json`);
const G_QWEATHER_INTERVAL = 10 * 60 * 1000; // 10 minutes
const G_LOC_CHANGPING = '101010700'; // Beijing, Changping
const CODE_OK = 200;
const G_MIN_SHOW_NUM = 2;


const axiosObj = axios.create({
	baseURL: 'https://devapi.qweather.com/',
	timeout: 3 * 1000, // unit:s
	headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
});


async function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}


async function fetchWeatherData() {
	let weatherData = {};
	try {
		const url = `/v7/weather/now`;
		const reqConfig = {
			params: { location: G_LOC_CHANGPING, key: G_QWEATHER_TOKEN.key }
		};
		const res = await axiosObj.get(url, reqConfig);
		if (res && res.status === CODE_OK) {
			if (res && res.data && res.data.code === CODE_OK.toString()) {
				weatherData = res.data.now;
				console.log(`weatherData = ${JSON.stringify(weatherData)}`);
			}
		}
	} catch (error) {
		console.error('\n_fetchWeatherData throw an Error ...');
		console.error(error);
	}
	return weatherData;
}


async function showTemperatureWind(temperature = '', strWindScale = '') {
	if (!(temperature && temperature.length > 0 && strWindScale && strWindScale.length > 0)) {
		console.error(`new Date().toString() ~ _showTemperatureWind: ${JSON.stringify({ temperature, strWindScale })}`);
		return;
	}
	temperature = parseInt(temperature);
	let showDoublepoint = 0; 
	if (temperature < 0) {
		showDoublepoint = 1; // means: the temperature is below zero
		temperature = Math.abs(temperature);
	}
	let strTemperature = temperature.toString();
	if (strTemperature && strTemperature.length < G_MIN_SHOW_NUM) {
		strTemperature = '0' + strTemperature;
	}
	if (strWindScale && strWindScale.length < G_MIN_SHOW_NUM) {
		strWindScale = '0' + strWindScale;
	}
	const args = [ showDoublepoint, ... strTemperature.split(''), ... strWindScale.split('') ];
	const psOptions = {
		mode: 'text',
		pythonPath: 'python3',
		pythonOptions: ['-u'], // get print results in real-time
		scriptPath: './PyScripts',
		args
	};

	return new Promise((resolve, reject) => {
		PythonShell.run('show-param.py', psOptions, function (err, results) {
			if (err) {
				return reject(err);
			}
			return resolve();
		});
	});
}


async function go() {
	while(true) {
		const now = new Date();
		console.log(`\n${now.toString()} ~ _go start to fetch weather data ...`);
		const weatherData	= await fetchWeatherData();
		await showTemperatureWind(weatherData.feelsLike, weatherData.windScale);
		await sleep(G_QWEATHER_INTERVAL);
	}
}


(
	async () => {
		await go();
	}
)();

