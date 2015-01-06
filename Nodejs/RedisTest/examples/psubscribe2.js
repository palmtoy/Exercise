var redis = require("redis"),
    client1 = redis.createClient(),
    client2 = redis.createClient(),
    client3 = redis.createClient(),
    client4 = redis.createClient(),
    msg_count = 0;

redis.debug_mode = false;

client1.on("psubscribe", function (pattern, count) {
  console.log("client_1 psubscribed to " + pattern + ", " + count + " total subscriptions");
  switch(pattern) {
    case "channel_2":
      client2.publish(pattern, "client_2: Me!");
    break;
    case "channel_3":
      client3.publish(pattern, "client_3: Me too!");
    break;
    case "channel_4":
      client4.publish(pattern, "client_4: And me too!");
    break;
  }
});

client1.on("pmessage", function (pattern, channel, message) {
  console.log("\n("+  pattern +")" + " client1 received message on " + channel + ": " + message);
  msg_count += 1;
  console.log('msg_count = ', msg_count);
});

client1.on("punsubscribe", function (pattern, count) {
  console.log("client_1 punsubscribed from " + pattern + ", " + count + " total subscriptions");
  client4.end();
  client3.end();
  client2.end();
  client1.end();
});

client1.psubscribe("channel_2");
client1.psubscribe("channel_3");
client1.psubscribe("channel_4");

setTimeout(function() {
  console.log('\n');
  client1.punsubscribe();
}, 1000);

