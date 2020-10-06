const http = require('http');
const os = require('os');

const dbOptions = require('./db-options');
const knex = require('knex')(dbOptions.mysql);
const	redisCli = require("redis").createClient(dbOptions.redis);

const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html');

	let mysqlStr = 'MySQL ...<br>';
	knex.from('cars').select("*")
	.then(dataRows => {
		for (row of dataRows) {
			mysqlStr += `${row['id']}: ${row['name']} -> $${row['price']}<br>`;
		}
	})
	.catch(err => {
		const now = new Date();
		console.log('\n' + now + ` - ${now.getTime()} ↓`);
		console.log(err);
	})
	.finally(() => {
		let totalRequests = 0;
		redisCli.incr("httpRequests", function (err, reply) {
			totalRequests = reply; // stash response in outer scope
		});

		redisCli.hincrby("ip", req.connection.remoteAddress, 1);

		redisCli.hgetall("ip", function (err, reply) {
			// This is the last reply, so all of the previous replies must have completed already
			let redisStr = '<br>Redis ...<br>Total httpRequests: ' + totalRequests + '<br>IP count<br>';
			Object.keys(reply).forEach(function (ip) {
				redisStr += '    ' + ip + ': ' + reply[ip] + '<br>';
			});
			const now = new Date();
			let resStr = `<html><h2><font color='blue'>Hi sir, good to see you :-)</font></h2>` +
									 `<font color='navy'>${mysqlStr}</font>` + 
									 `<font color='red'>${redisStr}</font><br>` +
									 `From <font color='fuchsia'><b>${os.hostname()}</b></font>` +
									 ` ~ ${now} ~ Timestamp: <font color='purple'>${now.getTime()}</font></html>`;

			res.end(resStr);
		});
	});

});

server.listen(port, hostname, () => {
	console.log(`Server running at http:\/\/${hostname}:${port}\/`);
});

