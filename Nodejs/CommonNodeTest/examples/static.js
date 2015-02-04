/**
 *
 * @fileOverview Serve a static file from disk. The source code of the current module, i.e. this file is served.
 * server:
 * $ common-node hello.js // default port: 8080
 * $ common-node hello.js -p 8086
 * $ common-node hello.js -port 8086
 * $ common-node hello.js -P 8086
 *
 * client:  curl http://localhost:8080
 *
 */

var openRaw = require('fs-base').openRaw;

exports.app = function(request) {
	return {
		status: 200,
		headers: {},
		body: openRaw(module.filename)
	};
};

console.log('HTTP svr is running on localhost ...');
