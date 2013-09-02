var fs = require('fs');

console.log('cwd = ', process.cwd());
fs.rename('./tmp/world', './tmp/world', function (err) {

  if (err) throw err;
  console.log('renamed complete');

	fs.stat('./tmp/world', function (err, stats) {
		if (err) throw err;
		console.log('stats: ' + JSON.stringify(stats));
	});

});


