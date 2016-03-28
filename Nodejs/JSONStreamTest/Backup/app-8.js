var fs = require('fs')
  , JSONStream = require('JSONStream');

var fsStream = fs.createReadStream('./data.json', {encoding: 'utf8'});

var jStream = JSONStream.parse(['rows', true, 'doc']) //rows, ANYTHING, doc 

jStream.on('data', function(data) {
  console.log('jStream.on:data is running ...');
	console.log('received:', data);
  console.log('\n');
});

fsStream.pipe(jStream);

