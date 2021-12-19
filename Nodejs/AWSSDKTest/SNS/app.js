#!/usr/bin/env node
// In RaspberryPi -- $ pinout

const Gpio = require('onoff').Gpio; // Gpio class
const { doReport } = require('./report-ip-sns');

const G_TRIGGER_EDGE = 'falling';
// const G_TRIGGER_EDGE = 'rising';
const BTN_FOR_GPIO = new Gpio(16, 'in', G_TRIGGER_EDGE, {debounceTimeout: 10});

let G_IS_REPORTING = false;
const G_REPORTING_INTERVAL = 30 * 1000; // 30s
let G_TIMEOUT_OBJ = null;

function setResetReportingFlag () {
	G_IS_REPORTING = true;
	G_TIMEOUT_OBJ = setTimeout( () => {
		G_IS_REPORTING = false;
	}, G_REPORTING_INTERVAL);
}

BTN_FOR_GPIO.watch(async (err, value) => {
  if (err) {
		console.log(`${new Date().toString()} ~ "${err.message}"\n${err.stack}`);
  }

	console.log(`${new Date().toString()} ~ The button has been pressed.`);
	if (G_IS_REPORTING) {
		console.log(`${new Date().toString()} ~ Reporting-IP-With-SNS is still running, please wait for a while ...`);
		return;
	}

	setResetReportingFlag();

	try {
 		await doReport();
	} catch (e) {
		console.error(`_doReport: "${e.message}"\n${e.stack}`);
	}

	if (G_TIMEOUT_OBJ) {
		clearTimeout(G_TIMEOUT_OBJ);
		G_TIMEOUT_OBJ = null;
		G_IS_REPORTING = false;
	}
});

console.log(`${new Date().toString()} ~ BTN_FOR_GPIO.watch is running ...`);

process.on('SIGINT', _ => {
  BTN_FOR_GPIO.unexport();
	process.exit(0);
});

