/**
 * @fileOverview Spawn example. Spawns a new fiber which sleeps for 3 seconds
 *               before printing to the console while immediately returning an
 *               HTTP response.
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

var system = require('system');
var spawn = system.spawn, sleep = system.sleep;

exports.app = function(request) {
	spawn(function() {
		sleep(3000);
		console.log(new Date() + '~ Hello Server!');
	});
	return {
		status: 200,
		headers: {},
		body: ['Hello Client!\n']
	};
};

console.log('HTTP svr is running on localhost ...');

