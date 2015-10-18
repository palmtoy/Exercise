var request = require('request');

request.get({
	url: 'http://localhost:8086/greet/will',
	timeout: 3000,
	gzip: true},
	function(err, httpRes, body){
  if (!err && httpRes.statusCode === 200) {
    console.log(httpRes.statusCode);
    console.log(body);
  }
});

