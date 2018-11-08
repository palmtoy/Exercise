const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost:1883');
 
client.on('connect', function () {
	const tmpTopic = 'mytopic';
  client.subscribe(tmpTopic, function (err) {
    if (!err) {
      client.publish(tmpTopic, 'Hello MQTT in LocalServer  ~ ' + new Date());
  		console.log(`subscribe tmpTopic = ${tmpTopic}`);
    }
  });
});
 
client.on('message', function (tmpTopic, msg) {
  console.log(`tmpTopic = ${tmpTopic}`);
  // msg is Buffer
  console.log(`msg = ${msg.toString()}`);
  client.end();
});

