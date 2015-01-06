var redis = require("redis"),
    client1 = redis.createClient(),
    client2 = redis.createClient(),
    client3 = redis.createClient(),
    client4 = redis.createClient(),
    msg_count = 0;

redis.debug_mode = false;

client1.on("psubscribe", function (pattern, count) {
  console.log("client_1 psubscribed to " + pattern + ", " + count + " total subscriptions");
  client2.publish("channel_2", "client_2: Me!");
  client3.publish("channel_3", "client_3: Me too!");
  client4.publish("channel_4", "client_4: And me too!");
});

client1.on("punsubscribe", function (pattern, count) {
  console.log("client_1 punsubscribed from " + pattern + ", " + count + " total subscriptions");
  client4.end();
  client3.end();
  client2.end();
  client1.end();
});

client1.on("pmessage", function (pattern, channel, message) {
  console.log("("+  pattern +")" + " client1 received message on " + channel + ": " + message);
  msg_count += 1;
  if (msg_count === 3) {
    client1.punsubscribe();
  }
});

client1.psubscribe("channel*");

