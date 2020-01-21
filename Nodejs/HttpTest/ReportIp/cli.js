#!/usr/bin/env node

const http = require('http');
const os = require('os');

// const stdInterval = 3 * 60; // 3 minutes
const stdInterval = 3; // 3s

const svrIp = '127.0.0.1';
const svrPort = 38086;


function getMyIp() {
	const ifaceObj = os.networkInterfaces();
	const ifnameList = Object.keys(ifaceObj);
	for (let i = 0; i < ifnameList.length; i++) {
		const ifname = ifnameList[i];
		const ifaceList = ifaceObj[ifname];
		for (let j = 0; j < ifaceList.length; j++) {
			const iface = ifaceList[j];
			if ('IPv4' !== iface.family || iface.internal !== false) {
				// skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
				continue;
			}
			const tmpIp = iface.address;
			if (tmpIp && (tmpIp.startsWith('10.') || tmpIp.startsWith('192.'))) {
				return tmpIp;
			}
		}
	}
	return '0.0.0.0';
}


function sendIp2Svr() {
	const cliPlatform = os.platform();
	const myIp = getMyIp();
	const paramData = `/?platform=${cliPlatform}&ip=${myIp}`;

	const options = {
		hostname: svrIp,
		path: paramData,
		port: svrPort,
		method: 'GET',
		headers: {
			'Content-Type': 'text/plain'
		}
	};

	console.log(`My platform: ${cliPlatform}, My IP: ${myIp}`);

	const req = http.request(options, (res) => {
		console.log(`\nStatusCode: ${res.statusCode}`);
		console.log(`<--------------------------------------->\n`);
	});

	req.on('error', (e) => {
		console.error(`\nProblem with request: ${e.message}\n`);
	});

	req.end();
}


sendIp2Svr();

setInterval(sendIp2Svr, stdInterval * 1000);

