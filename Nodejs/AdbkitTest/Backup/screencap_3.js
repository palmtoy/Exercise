var Promise = require('bluebird');
var adb = require('adbkit');
var client = adb.createClient();
var fs = require('fs');
var PNG = require('node-png').PNG;

client.listDevices()
	.then(function(devices) {
		return Promise.map(devices, function(device) {
			return client.screencap(device.id)
			.then(function(imgStream) {
				imgStream.pipe(fs.createWriteStream('myscreen-' + device.id + '-origin.png'));
				imgStream.pipe(new PNG({
					filterType: 4
				}))
				.on('parsed', function() {
					for (var y = 0; y < this.height; y++) {
						for (var x = 0; x < this.width; x++) {
							var idx = (this.width * y + x) << 2;
							// invert color 
							this.data[idx] = 255 - this.data[idx];
							this.data[idx+1] = 255 - this.data[idx+1];
							this.data[idx+2] = 255 - this.data[idx+2];
							// and reduce opacity 
							this.data[idx+3] = this.data[idx+3] >> 1;
						}
					}

					this.pack().pipe(fs.createWriteStream('myscreen-' + device.id + '-parsed.png'));
				});
			});
		})
	})
	.then(function() {
		console.log('Done screencap on connected devices.')
	})
	.catch(function(err) {
		console.error('Something went wrong:', err.stack)
	});

