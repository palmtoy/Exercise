const http = require('http');

const loopCnt = 100;

const strRegExp = new RegExp('<b>.*</b>');
const podMap = {};
let cnt = 0;

const funcGet = (i) => {
	http.get('http://192.168.0.116', (res) => {
		const { statusCode } = res;
		const contentType = res.headers['content-type'];

		let error;
		if (statusCode !== 200) {
			error = new Error('Request Failed.\n' +
												`Status Code: ${statusCode}`);
		}
		if (error) {
			console.error(error.message);
			res.resume(); // consume response data to free up memory
			return;
		}

		res.setEncoding('utf8');
		let rawData = '';
		res.on('data', (chunk) => { rawData += chunk; });
		res.on('end', () => {
			try {
				console.log(rawData);
				let tmpStr = rawData.match(strRegExp)[0];
				tmpStr = tmpStr.substring(3, tmpStr.length - 4);
				podMap[tmpStr] = (podMap[tmpStr] || 0) + 1;
				console.log(tmpStr + '\n');
				cnt++;
				if (cnt >= loopCnt) {
					console.log('\n' + JSON.stringify(podMap) + '\n');
				}
			} catch (e) {
				console.error(e.message);
			}
		});
	}).on('error', (e) => {
		console.error(`Got error: ${e.message}`);
	});
};


for (let i = 0; i < loopCnt; i++) {
	funcGet(i);
}

