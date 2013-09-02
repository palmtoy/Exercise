var net = require('net');
var Composer = require('stream-pkg');

var client = net.connect({port: 8888});

var composer = new Composer();
var count = 30;
var src = 'hello world!';
var revCount = 0;

composer.on('data', function(pkg) {
	console.log('composer.on ~ pkg = ', pkg.toString());
  if(pkg.toString() === src) {
    console.log('ok ~ 1');
  } else {
    console.log('ok ~ 2');
  }

  revCount++;

  if(revCount >= count) {
    client.end();
  }
});

client.on('data', function(data) {
	console.log('client.on ~ data = ', data);
  composer.feed(data);
});

for(var i=0; i<count; i++) {
    client.write(composer.compose(i + src + i));
}
