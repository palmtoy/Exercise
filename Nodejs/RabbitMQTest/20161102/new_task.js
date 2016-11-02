#!/usr/bin/env node

/* 
	1) ./worker.js
	2) ./new_task.js '.....'
	ps: the param '.....' is just for new_task.js
*/

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://UbuntuVB', function(err, conn) {
	conn.createChannel(function(err, ch) {
		var q = 'task_queue';
		var msg = process.argv.slice(2).join(' ') || "Hello World!";

		ch.assertQueue(q, {durable: true});
		ch.sendToQueue(q, new Buffer(msg), {persistent: true});
		console.log(" [x] Sent '%s'", msg);

		setTimeout(function(){
			conn.close(); process.exit(0)
		}, 10);
	});
});

