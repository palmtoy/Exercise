var Promise = require('bluebird');
var adb = require('adbkit');
var client = adb.createClient();

client.listDevices()
	.then(function(devices) {
		return Promise.map(devices, function(device) {
			return client.readdir(device.id, '/sdcard')
				.then(function(files) {
					// Synchronous, so we don't have to care about returning at the
					// right time
					files.forEach(function(file) {
						if (file.isFile()) {
							console.log('[%s] Found file "%s"', device.id, file.name)
						}
					})
				})
		})
	})
	.then(function() {
		console.log('Done checking /sdcard files on connected devices')
	})
	.catch(function(err) {
		console.error('Something went wrong:', err.stack)
	});

