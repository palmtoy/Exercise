var Promise = require('bluebird');
var adb = require('adbkit');
var client = adb.createClient();
var fs = require('fs');
var sharp = require('sharp');

var transformer = sharp()
	.resize(360, 640)
	.on('info', function(info) {
		console.log('Image size is ' + info.width + 'x' + info.height + '.');
	});

client.listDevices()
	.then(function(devices) {
		return Promise.map(devices, function(device) {
			return client.screencap(device.id)
			.then(function(imgStream) {
				imgStream
				.pipe(transformer)
				.pipe(fs.createWriteStream('myscreen-' + device.id + '-resized.png'));
			});
		})
	})
	.then(function() {
		console.log('Done screencap on connected devices.')
	})
	.catch(function(err) {
		console.error('Something went wrong:', err.stack)
	});

