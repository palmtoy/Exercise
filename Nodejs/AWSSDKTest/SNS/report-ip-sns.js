#!/usr/bin/env node
/*
	ABOUT THIS NODE.JS SAMPLE: This sample is part of the SDK for JavaScript Developer Guide topic at
	https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/sns-examples-publishing-messages.html
*/

// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
const { networkInterfaces } = require('os');
const { blinkRYGLightsOneRound } = require('./red-green-light');

AWS.config.credentials = new AWS.SharedIniFileCredentials({profile: 'personal-account-long-term'});
// Set region
AWS.config.update({region: 'us-west-2'});

const snsObj = new AWS.SNS({apiVersion: '2010-03-31'});


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


async function doReport() {
	return new Promise(async (resolve, reject) => {
		try {
			const now = new Date().toString();
			const tmpIp4wifi = getLocalIp4wifi();
			if (!tmpIp4wifi) {
				console.log(`Func:_doReport is running, but tmpIp4wifi is empty. ~ ${now}`);
				return resolve();
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
				return resolve();
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
					await blinkRYGLightsOneRound();
					resolve();
				}).catch(
					function(err) {
						console.error('\n_publishTextPromise:', err, err.stack, '\n');
						reject();
					}
				);
		} catch(err) {
			console.error('\n_listTopicsPromise:', err, err.stack, '\n');
			reject();
		}
	});
}


module.exports = {
	doReport, 
}

