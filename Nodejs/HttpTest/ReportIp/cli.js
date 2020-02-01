process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const https = require('https');
const os = require('os');

const firstInterval = 30 * 1000; // 30s
const stdInterval = 3 * 60 * 1000; // 3 minutes

const svrIp = '127.0.0.1';
const svrPort = 8086;
const postfixLen = 3;


function getMyIp() {
	const ifaceObj = os.networkInterfaces();
	const ifnameList = Object.keys(ifaceObj);
	let retIp = '';
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
				retIp += '[ ' + tmpIp + ' ] / ';
			}
		}
	}
	if (retIp && retIp.length > postfixLen) {
		return retIp.substring(0, retIp.length - postfixLen);
	}
	return '0.0.0.0';
}


function sendIp2Svr() {
	const now = new Date();
	const cliPlatform = os.platform();
	const myIp = getMyIp();
	const paramData = `/?os_platform=${cliPlatform}&os_ip=${encodeURIComponent(myIp)}`;

	const options = {
		hostname: svrIp,
		path: paramData,
		port: svrPort,
		method: 'GET',
		headers: {
			'Content-Type': 'text/plain'
		},
	};

	console.log(`${now} ~ My platform: ${cliPlatform}, My IP: ${myIp}`);

	const req = https.request(options, (res) => {
		console.log(`${now} ~ StatusCode: ${res.statusCode}`);
		console.log(`<---------------------------------------->\n`);
	});

	req.on('error', (e) => {
		console.error(`\n!!!<- ${now} ~ Problem with request: ${e.message} ->!!!\n`);
	});

	req.end();
}


setTimeout(sendIp2Svr, firstInterval);

setInterval(sendIp2Svr, stdInterval);

