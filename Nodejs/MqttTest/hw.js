var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://test.mosquitto.org');
 
client.on('connect', function () {
  client.subscribe('presence', function (err) {
    if (!err) {
      client.publish('presence', 'Hello mqtt ~ ' + new Date());
    }
  });
});
 
client.on('message', function (topic, message) {
  console.log(`topic = ${topic}`);
  // message is Buffer
  console.log(`msg = ${message.toString()}`);
  client.end();
});

