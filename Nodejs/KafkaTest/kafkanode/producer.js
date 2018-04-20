var kafka = require('kafka-node');
var Producer = kafka.Producer;
var KeyedMessage = kafka.KeyedMessage;
var Client = kafka.Client;
var client = new Client('localhost:2181');
var argv = require('optimist').argv;
var topic = argv.topic || 'mytest-topic-z';
var p = argv.p || 0;
var a = argv.a || 0;
var producer = new Producer(client, { requireAcks: 1 });

producer.on('ready', function () {
	var maxNum = 3;

	for(var i = 0; i < maxNum; i++) {
		var tmpMsg = "message ~ " + (i + 1);
		var tmpKeyedMsg = 'keyed ' + tmpMsg;
		var keyedMessage = new KeyedMessage('keyed', tmpKeyedMsg);

		producer.send([
			{ topic: topic, partition: p, messages: [tmpMsg, keyedMessage], attributes: a }
		], function (err, result) {
			console.log(err || result);
			process.exit();
		});
	}
});

producer.on('error', function (err) {
  console.log('error', err);
});

