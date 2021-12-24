#!/usr/bin/env node

// In RaspberryPi -- $ pinout
const sensorObj = require('node-dht-sensor');
const sensorPromise = require('node-dht-sensor').promises;
const { PythonShell } = require('python-shell');

const G_SENSOR_MODEL = 11; // DHT 的型号为 DHT11; 
const GPIO_NUM = 20; // 信号输入接GPIO20, 即引脚38
const G_COLLECT_INTERVAL = 60 * 1000; // 60s
const G_MIN_SHOW_NUM = 2; // 显示 温度 | 湿度 最少的数字位数  

async function sleep(interval) {
	return new Promise(resolve => setTimeout(resolve, interval));
}

async function showTemperatureHumidity(temperature, humidity) {
	let strTemperature = temperature.toString();
	let strHumidity = humidity.toString();
	if (strTemperature && strTemperature.length < G_MIN_SHOW_NUM) {
		strTemperature = '0' + strTemperature;
	}
	if (strHumidity && strHumidity.length < G_MIN_SHOW_NUM) {
		strHumidity = '0' + strHumidity;
	}
	const args = [ ... strTemperature.split(''), ... strHumidity.split('') ];
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

async function collectAndPrint() {
	await new Promise((resolve, reject) => {
		sensorObj.read(G_SENSOR_MODEL, GPIO_NUM, async function (err, temperature, humidity) {
			const now = new Date().toString();
			if (!err) {
				console.log(`${now} ↓\n` + `temperature: ${temperature}°C, humidity: ${humidity}%\n`);
				await showTemperatureHumidity(temperature, humidity);
				return resolve();
			}
			console.error(`${now} ~ _collectAndPrint: "${err.message}"\n${err.stack}\n`);
			return reject(err);
		});
	});
}


async function collectAndPrintPromise() {
  try {
		const now = new Date().toString();
    const res = await sensorPromise.read(G_SENSOR_MODEL, GPIO_NUM);
    // console.log(`${now} ↓\n` + `temp: ${res.temperature.toFixed(1)}°C, ` + `humidity: ${res.humidity.toFixed(1)}%`);
    console.log(`${now} ↓\n` + `temperature: ${res.temperature}°C, ` + `humidity: ${res.humidity}%\n`);
		await showTemperatureHumidity(res.temperature, res.humidity);
  } catch (err) {
    console.error("Failed to read sensor data:", err);
		console.error(`${now} ~ _collectAndPrint: "${err.message}"\n${err.stack}\n`);
  }
}


async function go() {
	while(true) {
		try {
			// await collectAndPrint();
			await collectAndPrintPromise();
		} catch (e) {}
		await sleep(G_COLLECT_INTERVAL);
	}
}

go();

