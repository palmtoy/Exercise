var redis = require("redis"),
client = redis.createClient();

client.on("connect", function () {
  client.select(1, function(err, rep) {
    if(err) {
      return console.log('err = ', err);
    }

    client.set("foo_rand", "some fantastic value", redis.print);
    client.get("foo_rand", redis.print);

    setTimeout(function() {
      client.end();
    }, 1000);
  });
});

