var redis = require("redis"),
client = redis.createClient();

// post data to database 1 rather than db 0
client.select(1, function(err, rep) {
  if(err) {
    return console.log('err = ', err);
  }
  console.log('Select ~ typeof rep, rep =', typeof rep, rep);

  client.del("hash_key", redis.print);

  client.hset("hash_key", "hashtest_1", "some value", redis.print);

  client.hset(["hash_key", "hashtest_2", "some other value"], redis.print);

  client.hkeys("hash_key", function (err, replies) {
    console.log(replies.length + " replies:");
    replies.forEach(function (reply, i) {
      console.log("    " + i + ": " + reply);
    });
    client.quit();
  });

});

client.on("error", function (err) {
  console.log("Error " + err);
});

