/**
 * @fileOverview Sleep example. Sleep for one second before returning a
 *               response.
 * 
 * server:
 * $ common-node hello.js // default port: 8080
 * $ common-node hello.js -p 8086
 * $ common-node hello.js -port 8086
 * $ common-node hello.js -P 8086
 * 
 * client:  curl http://localhost:8080
 * 
 */
var sleep = require('system').sleep;

exports.app = function(request) {
	sleep(1000);
	return {
		status: 200,
		headers: {},
		body: ['Hello Sleep!\n']
	};
};

console.log('HTTP svr is running on localhost ...');

