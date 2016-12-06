var fs = require('fs');
var adb = require('adbkit');
var client = adb.createClient();

client.listDevices(function(err, devices) {
	devices.forEach(function(d) {
		client.screencap(d.id, function(err, imgStream) {
			if(err) {
				return console.error('Something went wrong:', err.stack)
			}
			imgStream.pipe(fs.createWriteStream('myscreen-' + d.id + '.png'));
		})
	});
});

