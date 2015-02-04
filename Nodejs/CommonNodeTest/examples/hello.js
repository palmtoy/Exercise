/**
 * @fileOverview Hello World example.
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

exports.app = function(request) {
	return {
		status: 200,
		headers: {},
		body: ['Hello World!\n']
	};
};

console.log('HTTP svr is running on localhost ...');
