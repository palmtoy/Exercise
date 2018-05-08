/*
	 curl -v http://127.0.0.1:8081
	 curl -v http://127.0.0.1:8081/echo?name=xyt
	 curl -kv https://127.0.0.1/echo?name=palmtoy (nginx https proxy)
*/

var http = require('http');
var url = require('url');
var resData = require('./data.json');

var n = 0;

http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});

	var queryData = url.parse(req.url, true).query;
	console.log(++n + ': queryData =' , JSON.stringify(queryData));
	var now = new Date() + ' ~';
	var str = '';
	if (queryData.name) {
		str = stringFormat(resData.SPECIAL_RES, n, now, queryData.name);
	} else {
		str = stringFormat(resData.DEFAULT_RES, n, now);
	}

	res.end(str);
}).listen(8081, '127.0.0.1');

console.log('Server running at http://127.0.0.1:8081/');


function stringFormat() {
	// The string containing the format items (e.g. "{0}")
	// will and always has to be the first argument.
	var theString = arguments[0];

	// start with the second argument (i = 1)
	for (var i = 1; i < arguments.length; i++) {
		// "gm" = RegEx options for Global search (more than one instance)
		// and for Multiline search
		var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
		theString = theString.replace(regEx, arguments[i]);
	}

	return theString;
}

