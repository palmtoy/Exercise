var redis = require("redis"),
client = redis.createClient();

client.select(1, function(err, rep) {
  if(err) {
    return console.log('err = ', err);
  }

  client.set("foo_rand", "some fantastic value");

  client.get("foo_rand", function (err, reply) {
    console.log(reply.toString());
    client.end();
  });
});
