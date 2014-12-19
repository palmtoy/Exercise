var redis = require("redis"),
client = redis.createClient({detect_buffers: false});

client.select(1, function(err, rep) {
  if(err) {
    return console.log('err = ', err);
  }

  client.hmset("hosts", "mjr", "1", "another", "23", "home", "1234");

  client.hgetall("hosts", function (err, obj) {
    console.dir(obj);
    client.end();
  });
});

