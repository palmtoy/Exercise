var Promise = require('bluebird');
var adb = require('adbkit');
var client = adb.createClient();
var fs = require('fs');
var PNG = require('pngjs').PNG;

client.listDevices()
	.then(function(devices) {
		return Promise.map(devices, function(device) {
			return client.screencap(device.id)
			.then(function(imgStream) {
				imgStream
				.pipe(new PNG({
					filterType: 4
				}))
				.on('parsed', function() {
					this.pack().pipe(fs.createWriteStream('myscreen-' + device.id + '-parsed.png'));
				})
				.on('metadata', function(metadata) {
					console.log('metadata =', JSON.stringify(metadata))
				})
			});
		})
	})
	.then(function() {
		console.log('Done screencap on connected devices.')
	})
	.catch(function(err) {
		console.error('Something went wrong:', err.stack)
	});

