var redis = require("redis"),
client = redis.createClient({detect_buffers: false});

client.select(1, function(err, rep) {
  if(err) {
    return console.log('err = ', err);
  }

  client.HMSET('foo', {
    "0123456789": "abcdefghij", // NOTE: key and value will be coerced to strings
    "some manner of key": "a type of value"
  });

  client.hgetall('foo', function (err, obj) {
    console.dir(obj);
    client.end();
  });
});

