/*
	mkdir -p ./test/fixtures/keys
	cd ./test/fixtures/keys
	openssl genrsa 4096 > agent2-key.pem
	openssl req -x509 -days 365 -new -key agent2-key.pem > agent2-cert.pem

	curl -k https://localhost:8000/
*/

const https = require('https');
// const http = require('http');
const fs = require('fs');

const keysPath = './test/fixtures/keys';

const options = {
  key: fs.readFileSync(keysPath + '/agent2-key.pem'),
  cert: fs.readFileSync(keysPath + '/agent2-cert.pem')
};

const port = 8008;
https.createServer(options, function (req, res) {
  res.writeHead(200, {'Content-disposition': 'attachment; filename=EE-ZJU-CERT.pem'}); // here you can specify file name
	fs.createReadStream(keysPath + '/agent2-cert.pem').pipe(res);
}).listen(port);

console.log('Https svr is running on port:', port, '...');

