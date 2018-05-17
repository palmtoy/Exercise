#!/usr/bin/env node

/*
curl -k -X POST \
  https://localhost:3000/wow \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -v -d '{"user":"palmtoy"}'
*/
 

var rp = require('request-promise');

var options = {
	method: 'POST',
	rejectUnauthorized: false,
	uri: 'https://localhost:3000/wow',
	// uri: 'https://localhost:3000/qs',
	headers: {
		'User-Agent': 'request-promise'
	},
	body: {
		user: 'palmtoy'
	},
	json: true // Automatically stringifies the body to JSON
};

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

