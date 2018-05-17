#!/usr/bin/env node

// curl -v -d 'user=palmtoy' http://localhost:3000/wow

var rp = require('request-promise');

var options = {
	method: 'POST',
	uri: 'http://localhost:3000/wow',
	body: {
		user: 'palmtoy'
	},
	json: true // Automatically stringifies the body to JSON
};

/*
rp(options)
.then(function (parsedBody) {
	// POST succeeded...
	console.log('decoded chunk: ' + parsedBody);
})
.catch(function (err) {
	// POST failed...
	console.log('err = ' + err);
});
*/

function promistHttpRequest() { 
	return new Promise((resolve, reject) => {
		rp(options)
		.then(function (parsedBody) {
			// POST succeeded...
			resolve(parsedBody);
		})
		.catch(function (err) {
			// POST failed...
			reject(err);
		});
	});
}

async function doReq() {
	try {
		let x = await promistHttpRequest();
		console.log(Date.now() + " ~ resolve x = " + x);
	} catch(e) {
    console.log(Date.now() + " ~ rejecct e = " + e);
	}
}

doReq();

console.log(Date.now() + " ~ Go...");

