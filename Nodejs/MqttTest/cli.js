const mqtt = require('mqtt');

const targetHost = 'localhost';
const targetPort = 1883;
const client = mqtt.connect(`mqtt:\/\/${targetHost}:${targetPort}`);
 
client.on('connect', function () {
	const tmpTopic = 'mytopic';
  client.subscribe(tmpTopic, function (err) {
    if (!err) {
      client.publish(tmpTopic, `Hello MQTT at ${targetHost}  ~  ${new Date()}`);
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

