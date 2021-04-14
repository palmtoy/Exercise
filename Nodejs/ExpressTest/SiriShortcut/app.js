const express = require('express');
const bodyParser = require('body-parser');
const exec = require('child_process').exec;

const port = 9999

const app = express();
const router = express.Router();

const _getMyIp = async() => {
	return new Promise((resolve, reject) => {
		const cmd = 'myip';
		exec(cmd,
			(error, stdout, stderr) => {
				if(error) {
					console.log('__getMyIp exec error: ' + error);
				}
				return resolve(stdout || '127.0.0.1');
			});
	});
};


const _formatResList2html = (resList) => {
	let resHtml = '<html><body>';
	const tmpLen = resList.length;
	for(let i = 0; i < tmpLen; i++) {
		const str = resList[i];
		if (str) {
			if (i === 0) {
				resHtml += `<b><p><font size='21'>* ${str}</font></p></b><br/>`;
			} else {
				resHtml += `<p><font size='20'>* ${str}</font></p><br/>`;
			}
		}
	}
	resHtml += '</body></html>'
	return resHtml;
};

const _execCmd = (res, cmd) => {
	const realCmd = 'vm-' + cmd;
	exec(realCmd,
		(error, stdout, stderr) => {
			console.log('stdout: ' + stdout);
			const tmpList = stdout.split('\n');
			let resList = [];
			if (cmd === 'start') {
				const tmpLen = tmpList.length;
				for (let i = tmpLen - 1; i >= 0; i--) {
					const tmpStr = tmpList[i];
					if (tmpStr.includes('publicIpAddress')) {
						resList.push(tmpStr);
						break;
					}
				}
			} else if (cmd === 'stop') {
				const tmpLen = tmpList.length;
				for (let i = tmpLen - 1; i >= 0; i--) {
					const tmpStr = tmpList[i];
					if (tmpStr.includes('stopped')) {
						resList.push(tmpStr);
						break;
					}
				}
			}
			resList = resList.concat(tmpList);
			console.log({ resList });
			res.send(resList);
			/*
				const resHtml = _formatResList2html(resList);
				res.send(resHtml);
			*/
			if(error) {
				console.log('__execCmd exec error: ' + error);
				return;
			}
		});
};

router.post('/', async (req, res) => {
	const reqTime = new Date().toString();
	console.log('\n', { reqTime , 'cli req.body': req.body });
	_execCmd(res, req.body.cmd);
});

app.use(bodyParser.json());
app.use('/vm', router);

app.listen(port);

(async() => {
	const myIP = await _getMyIp();
	console.log(`Express srv for Siri is running on http:\/\/${myIP}:${port}...`);
})();


