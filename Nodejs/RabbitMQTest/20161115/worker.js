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

		ch.assertQueue(q, {durable: true});
		// don't dispatch a new message to a worker until it has processed and acknowledged the previous one
    ch.prefetch(1);
		console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);

		ch.consume(q, function(msg) {
			var str = msg.content.toString();
			var secs = str.split('.').length - 1;
			console.log(" [x] Received %s ~ %s ~ will last for %d seconds.", str, Date(), secs);

			setTimeout(function() {
				console.log(" [x]     Done %s ~ %s\n", str, Date());
				ch.ack(msg);
			}, secs * 1000);
		}, {noAck: false});
	});
});

