var express = require('express');
var app = express();


app.use(express.logger());
app.use(express.static(__dirname + '/Lord'));

/*
var fs = require('fs');
app.use(function(req, res, next){
	var prefixPath = __dirname + '/Lord' + req.url;
  var filePath = prefixPath + '.heapsnapshot';

	if(fs.existsSync(filePath)) {
		res.sendfile(filePath);
	} else {
  	filePath = prefixPath + '.cpuprofile';
		if(fs.existsSync(filePath)) {
			res.sendfile(filePath);
		}
	}
});
*/


app.listen(8080);
console.log('Http file server is running ...');

