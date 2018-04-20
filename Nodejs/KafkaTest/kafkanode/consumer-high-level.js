'use strict';

var kafka = require('kafka-node');
var HighLevelConsumer = kafka.HighLevelConsumer;
var Client = kafka.Client;
var argv = require('optimist').argv;
var topic = argv.topic || 'mytest-topic-z';
var client = new Client('localhost:2181');
var topics = [{ topic: topic }];
var options = { autoCommit: true, fetchMaxWaitMs: 1000, fetchMaxBytes: 1024 * 1024 };
var highLevelConsumer = new HighLevelConsumer(client, topics, options);

highLevelConsumer.on('message', function (message) {
  console.log(message);
});

highLevelConsumer.on('error', function (err) {
  console.log('error', err);
});

process.on('SIGINT', function () {
  console.log('\nbye.');
	highLevelConsumer.close(true, function () {
		process.exit();
	});
});

