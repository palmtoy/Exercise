var Promise = require('bluebird');
var adb = require('adbkit');
var client = adb.createClient();
var fs = require('fs');

client.listDevices()
	.then(function(devices) {
		return Promise.map(devices, function(device) {
			return client.screencap(device.id)
			.then(function(imgStream) {
				imgStream.pipe(fs.createWriteStream('myscreen-' + device.id + '.png'));
			});
		})
	})
	.then(function() {
		console.log('Done screencap on connected devices.')
	})
	.catch(function(err) {
		console.error('Something went wrong:', err.stack)
	});

