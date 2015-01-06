var redis  = require("redis"),
    client = redis.createClient();

client.select(1, function(err, rep) {
  if(err) {
    return console.log('err = ', err);
  }

  // client.mset("sessions_started", 100, "foo", "bar", redis.print);
  client.mset(["sessions_started", 100, "foo", "bar"], redis.print);

  client.mget(["sessions_started", "sessions_started", "foo"], function (err, res) {
    console.dir(res);
    client.quit();
  });

});

