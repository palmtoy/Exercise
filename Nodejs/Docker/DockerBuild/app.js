const http = require('http');
const os = require('os');

const dbOptions = require('./db-options');
const knex = require('knex')(dbOptions);

const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html');

	let resStr = '';
	knex.from('cars').select("*")
	.then(dataRows => {
		for (row of dataRows) {
			resStr += `${row['id']}: ${row['name']} -> $${row['price']}<br>`;
		}
	})
	.catch(err => { console.log(err); })
	.finally(() => {
		res.end(`<html><h2>Hi sir, good to see you :-)</h2><h3>${resStr}</h3>From <b>` + os.hostname() + '</b> ~ ' + new Date() + ` ~ Timestamp:${new Date().getTime()}</html>`);
	});

});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});

