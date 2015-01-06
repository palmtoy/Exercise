var redis = require("redis"),
    client = redis.createClient();

// post data to database 1 rather than db 0
client.select(1, function(err, rep) {
  if(err) {
    return console.log('err = ', err);
  }

  client.set("string_key", "string val", redis.print);

  client.hset("hash_key", "hashtest_1", "some value", redis.print);

  client.hset(["hash_key", "hashtest_2", "some other value"], redis.print);

  client.hkeys("hash_key", function (err, replies) {
    console.log(replies.length + " replies:");
    replies.forEach(function (reply, i) {
      console.log("    " + i + ": " + reply);
    });
  });

  client.on("error", function (err) {
    console.log("Error " + err);
  });

  client.quit(function (err, res) {
    console.log("\nExiting from quit command.");
  });

});

