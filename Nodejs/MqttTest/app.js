const mqtt = require('mqtt');

const targetHost = '127.0.0.1'; // mqtt.bconimg.com
const targetPort = 1883;

const cli = mqtt.connect(`mqtt:\/\/${targetHost}:${targetPort}`);
 
cli.on('connect', function () {
	const bcTopic = '/ustech/beacons';
	cli.subscribe(bcTopic, function (err) {
    if (!err) {
			cli.publish(bcTopic, `Hello MQTT at ${targetHost}  ~  ${new Date()}`);
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

