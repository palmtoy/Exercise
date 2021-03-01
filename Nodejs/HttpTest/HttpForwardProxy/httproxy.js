const http = require('http');
const net = require('net');
const os = require('os');

const srvPort = 8888;
let debugging = 1;

const _getMyIp = () => {
	const netList = os.networkInterfaces();
	const results = {};
	for (const name of Object.keys(netList)) {
		for (const netObj of netList[name]) {
			// Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
			if (netObj.family === 'IPv4' && !netObj.internal) {
				if (!results[name]) {
					results[name] = [];
				}
				results[name].push(netObj.address);
			}
		}
	}
	if (results.en0 && results.en0.length > 0) {
		return results.en0[0];
	}
	return '127.0.0.1';
};

const getHostPortFromString = (hostString, defaultPort) => {
	let host = hostString;
	let port = defaultPort;

	const regexHostport = /^([^:]+)(:([0-9]+))?$/;
	const tmpResult = regexHostport.exec(hostString);
	if (tmpResult != null) {
		host = tmpResult[1];
		if (tmpResult[2] != null) {
			port = tmpResult[3];
		}
	}

	return ([host, port]);
}

// handle a HTTP proxy request
const httpUserRequest = (userRequest, userResponse) => {
	if (debugging) {
		console.log('  > request: %s', userRequest.url);
	}

	const hostPort = getHostPortFromString(userRequest.headers['host'], 80);

	// have to extract the path from the requested URL
	let tmpPath = userRequest.url;
	const tmpResult = /^[a-zA-Z]+:\/\/[^\/]+(\/.*)?$/.exec(userRequest.url);
	if (tmpResult) {
		if (tmpResult[1].length > 0) {
			tmpPath = tmpResult[1];
		} else {
			tmpPath = "/";
		}
	}

	const options = {
		'host': hostPort[0],
		'port': hostPort[1],
		'method': userRequest.method,
		'path': tmpPath,
		'agent': userRequest.agent,
		'auth': userRequest.auth,
		'headers': userRequest.headers
	};

	if (debugging) {
		console.log('  > options: %s', JSON.stringify(options, null, 2));
	}

	const proxyRequest = http.request(options, (proxyResponse) => {
		if (debugging) {
			console.log('  > request headers: %s', JSON.stringify(options['headers'], null, 2));
			console.log('  < response %d headers: %s', proxyResponse.statusCode, JSON.stringify(proxyResponse.headers, null, 2));
		}

		userResponse.writeHead(proxyResponse.statusCode, proxyResponse.headers);

		proxyResponse.on('data', (chunk) => {
			userResponse.write(chunk);
		}
		);

		proxyResponse.on('end', () => {
			userResponse.end();
		}
		);
	}
	);

	proxyRequest.on('error', (error) => {
		userResponse.writeHead(500);
		userResponse.write(
			"<h1>500 Error</h1>\r\n" +
			"<p>Error was <pre>" + error + "</pre></p>\r\n" +
			"</body></html>\r\n"
		);
		userResponse.end();
	}
	);

	userRequest.addListener('data', (chunk) => {
		proxyRequest.write(chunk);
	}
	);

	userRequest.addListener('end', () => {
		proxyRequest.end();
	}
	);
}

function main() {
	let port = srvPort; // default port if none on command line

	// check for any command line arguments
	for (let argn = 2; argn < process.argv.length; argn++) {
		if (process.argv[argn] === '-p') {
			port = parseInt(process.argv[argn + 1]);
			argn++;
			continue;
		}

		if (process.argv[argn] === '-d') {
			debugging = 1;
			continue;
		}
	}

	// start HTTP server with custom request handler callback function
	const httpServer = http.createServer(httpUserRequest).listen(port);

	// add handler for HTTPS (which issues a CONNECT to the proxy)
	httpServer.addListener('connect', (request, socketRequest, bodyhead) => {
		const url = request['url'];
		const httpVersion = request['httpVersion'];
		const hostPort = getHostPortFromString(url, 443);

		if (debugging) {
			console.log('  = will connect to %s:%s', hostPort[0], hostPort[1]);
		}

		// set up TCP connection
		const proxySocket = new net.Socket();
		proxySocket.connect(parseInt(hostPort[1]), hostPort[0], () => {
			if (debugging) {
				console.log('  < connected to %s/%s', hostPort[0], hostPort[1]);
			}
			proxySocket.write(bodyhead);
			// tell the caller the connection was successfully established
			socketRequest.write("HTTP/" + httpVersion + " 200 Connection established\r\n\r\n");
		}
		);

		proxySocket.on('data', (chunk) => {
			socketRequest.write(chunk);
		}
		);

		proxySocket.on('end', () => {
			if (debugging) {
				console.log('  < end');
			}
			socketRequest.end();
		}
		);

		socketRequest.on('data', (chunk) => {
			proxySocket.write(chunk);
		}
		);

		socketRequest.on('end', () => {
			if (debugging) {
				console.log('  > end');
			}
			proxySocket.end();
		}
		);

		proxySocket.on('error', (err) => {
			socketRequest.write("HTTP/" + httpVersion + " 500 Connection error\r\n\r\n");
			if (debugging) {
				console.log('  < ERR: %s', err);
			}
			socketRequest.end();
		}
		);

		socketRequest.on('error', (err) => {
			if (debugging) {
				console.log('  > ERR: %s', err);
			}
			proxySocket.end();
		}
		);
	}
	); // HTTPS connect listener

	if (debugging) {
		const myIp = _getMyIp();
		console.log('Http forward proxy server is running on %s:%s ~ %s ...', myIp, port, new Date());
	}
}

main();
