#!/usr/bin/env node
/*
	ABOUT THIS NODE.JS SAMPLE: This sample is part of the SDK for JavaScript Developer Guide topic at
	https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/sns-examples-publishing-messages.html
*/

// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
const { networkInterfaces } = require('os');
const fs = require('fs');
// const { blinkRYGLightsOneRound } = require('./red-green-light');

AWS.config.credentials = new AWS.SharedIniFileCredentials({profile: 'personal-account-long-term'});
// Set region
AWS.config.update({region: 'us-west-2'});

const snsObj = new AWS.SNS({apiVersion: '2010-03-31'});

const G_CONFIG_PATH = './config.json';
const G_RESET_INTERVAL = 30 * 60 * 1000; // default value: 30minutes
const G_MAX_RUN_TIME = 30 * 60 * 1000; // default value: 30minutes
let G_START_TIME = 0;
let G_END_LOG_FLAG = false;
let G_IP_FOR_WIFI = '';
const G_POLLING_INTERVAL = 30 * 1000; // 30s
// const G_POLLING_INTERVAL = 5 * 1000; // 5s

function getLocalIp4wifi() {
	let ip4wifi = '';
	const nets = networkInterfaces();
	const results = {};

	for (const name of Object.keys(nets)) {
		for (const net of nets[name]) {
			// Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
			if (net.family === 'IPv4' && !net.internal) {
				results[name] = results[name] || [];
				results[name].push(net.address);
			}
		}
	}

	if (results.en0 && results.en0.length > 0) {
		ip4wifi = results.en0[0];
	}
	if (!ip4wifi && results.wlan0 && results.wlan0.length > 0) {
		ip4wifi = results.wlan0[0];
	}
	return ip4wifi;
}


function requireUncached(module) {
	delete require.cache[require.resolve(module)];
	return require(module);
}


async function resetGlobalVar() {
	let configJson = {};
	if (fs.existsSync(G_CONFIG_PATH)) {
		configJson = requireUncached(G_CONFIG_PATH);
	}
	const lastTimestamp = configJson.lastTimestamp || 0;
	const resetInterval = configJson.resetInterval || G_RESET_INTERVAL;
	const curTimestamp = Date.now();
	if (curTimestamp - lastTimestamp >= resetInterval) {
		G_START_TIME = curTimestamp;
		G_END_LOG_FLAG = false;
		G_IP_FOR_WIFI = '';
	}
	return { resetInterval, maxRunTime: configJson.maxRunTime || G_MAX_RUN_TIME };
}


async function writeConfigFile(resetInterval, maxRunTime) {
	const data = {
		lastTimestamp: Date.now(),
		resetInterval,
		maxRunTime,
	};
	fs.writeFileSync(G_CONFIG_PATH, JSON.stringify(data));
}


async function canStopRunning(maxRunTime) {
	const END_TIME = Date.now();
	if (END_TIME - G_START_TIME >= maxRunTime) {
		if (!G_END_LOG_FLAG) {
			G_END_LOG_FLAG = true;
			const now = new Date().toString();
			console.log(`\n${now} ~ Func:_canStopRunning -- ${JSON.stringify({ END_TIME, G_START_TIME, maxRunTime })}`);
			console.log(`Func:_canStopRunning is running about ${maxRunTime / 60 / 1000} minutes. Stop now. ~ ${now}\n`);
		}
		return true;
	}
	return false;
}


async function main() {
	try {
		const { resetInterval, maxRunTime } = await resetGlobalVar();
		const isStop = await canStopRunning(maxRunTime);
		if (isStop) {
			return;
		}
		await writeConfigFile(resetInterval, maxRunTime);
		const now = new Date().toString();
		const tmpIp4wifi = getLocalIp4wifi();
		if (tmpIp4wifi && G_IP_FOR_WIFI === tmpIp4wifi) {
			console.log(`Func:main is running ... tmpIp4wifi = ${tmpIp4wifi} ~ ${now}`);
			return;
		} else if (!tmpIp4wifi) {
			G_IP_FOR_WIFI = '';
			console.log(`Func:main is running, but tmpIp4wifi is empty. ~ ${now}`);
			return;
		} else {
			G_IP_FOR_WIFI = tmpIp4wifi;
		}

		// Create list topic parameters
		const params4list = {};
		let topicArn = '';
		// Create promise and SNS service object
		const resObj = await snsObj.listTopics(params4list).promise();
		console.log(`\n_listTopicsPromise: resObj = ${JSON.stringify(resObj)} ~ ${now}\n\n`);

		if (resObj && resObj.Topics && resObj.Topics.length > 0) {
			topicArn = resObj.Topics[0].TopicArn;
		}
		if (!topicArn) {
			console.error('Can\'t get SNS TopicArn ! Try later ...');
			return;
		}

		// Create publish parameters
		const subject4publish = 'Raspberry Pi 4B\'s IP';
		const params4publish = {
			Subject: subject4publish,
			Message: `${subject4publish}\n\n${tmpIp4wifi}\n\n${now}\n`,
			TopicArn: topicArn
		};

		// Create promise and SNS service object
		const publishTextPromise = snsObj.publish(params4publish).promise();

		// Handle promise's fulfilled/rejected states
		publishTextPromise.then(
			async function(data) {
				console.log(`Message ↓ \n\n${params4publish.Message}\nhas been sent to the topic ${params4publish.TopicArn}.\n\n`);
				// await blinkRYGLightsOneRound();
			}).catch(
				function(err) {
					console.error('\n_publishTextPromise:', err, err.stack, '\n');
				}
			);
	} catch(err) {
		console.error('\n_listTopicsPromise:', err, err.stack, '\n');
	}
}


(
	() => {
		G_START_TIME = Date.now();

		main();

		setInterval(main, G_POLLING_INTERVAL);
	}
)();


process.on('SIGINT', () => {
	process.exit(0);
});

