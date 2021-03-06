var redis = require("redis"),
client = redis.createClient(), set_size = 3;

client.select(1, function(err, rep) {
  if(err) {
    return console.log('err = ', err);
  }

  client.del("bigset");

  client.sadd("bigset", "item_A");
  client.sadd("bigset", "item_B");

  while (set_size > 0) {
    client.sadd("bigset", "member_" + set_size);
    set_size -= 1;
  }

  // multi chain with an individual callback
  client.multi()
  .scard("bigset")
  .smembers("bigset")
  .keys("*", function (err, replies) {
    // NOTE: code in this callback is NOT atomic
    // this only happens after the the .exec call finishes.
    client.mget(replies, redis.print);
    console.log("Keys ~ replies =", replies);
  })
  .dbsize()
  .exec(function (err, replies) {
    console.log("\nMULTI got " + replies.length + " replies\n");
    replies.forEach(function (reply, index) {
      console.log("Exec ~ Reply " + index + ": " + reply.toString());
    });
    console.log("\n");
  });

  setTimeout(function() {
    client.end();
  }, 1000);
});

