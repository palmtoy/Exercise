const mqtt = require('mqtt');
const cli = mqtt.connect('mqtt://mqtt.bconimg.com:1883');
 
cli.on('connect', function () {
	const bcTopic = '/ustech/beacons';
	cli.subscribe(bcTopic, function (err) {
    if (!err) {
  		console.log(`subscribe bcTopic = ${bcTopic}`);
    }
  });
});
 
cli.on('message', function (bcTopic, msg) {
  console.log(`bcTopic = ${bcTopic}`);
  // msg is Buffer
  console.log(`msg = ${msg.toString()}`);
  cli.end();
});

