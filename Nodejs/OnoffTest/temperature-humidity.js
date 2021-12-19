#!/usr/bin/env node

// In RaspberryPi -- $ pinout
const sensorObj = require('node-dht-sensor');
const sensorPromise = require('node-dht-sensor').promises;

const G_SENSOR_MODEL = 11; // DHT 的型号为 DHT11; 
const GPIO_NUM = 20; // 信号输入接GPIO20, 即引脚38
const G_COLLECT_INTERVAL = 10 * 1000; // 10s

async function sleep(interval) {
	return new Promise(resolve => setTimeout(resolve, interval));
}

async function collectAndPrint() {
	await new Promise((resolve, reject) => {
		sensorObj.read(G_SENSOR_MODEL, GPIO_NUM, function(err, temperature, humidity) {
			const now = new Date().toString();
			if (!err) {
				console.log(`${now} ~ temperature: ${temperature}°C, humidity: ${humidity}%`);
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
    console.log(
			`${now} ↓\n` +
      `temp: ${res.temperature.toFixed(1)}°C, ` +
        `humidity: ${res.humidity.toFixed(1)}%`
    );
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

