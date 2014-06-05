var myRequire = function(module) {
	var modulePath = require.resolve(module);
	if (require.cache[modulePath]) {
		delete require.cache[modulePath];
	}

	return require(module)
}

var fs = require('fs');

// watch files directory file
var p = __dirname + "/files/xyz.js";

fs.watch("files", function(event, filename) {
	var c = myRequire(p);
	console.log('pid = ', process.pid);
	console.log('content = ', c);
});

