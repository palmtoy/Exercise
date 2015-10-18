var request = require('request')

request(
	{ method: 'GET'
		, uri: 'http://localhost:8086/greet/will'
		, timeout: 3000
		, gzip: true
	}
	, function (error, response, body) {
		// body is the decompressed response body
		if(response) {
			console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'))
		}
		console.log('the decoded data is: ' + body)
	}
).on('data', function(data) {
	// decompressed data as it is received
	console.log('decoded chunk: ' + data)
})
.on('response', function(response) {
	// unmodified http.IncomingMessage object
	response.on('data', function(data) {
		// compressed data as it is received
		console.log('received ' + data.length + ' bytes of compressed data')
	})
})
