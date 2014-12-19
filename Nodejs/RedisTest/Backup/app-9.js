var redis = require("redis"),
client = redis.createClient(), multi;

client.select(1, function(err, rep) {
  if(err) {
    return console.log('err = ', err);
  }

  // start a separate multi command queue
  multi = client.multi();
  multi.incr("incr_thing", redis.print);
  multi.incr("incr_other_thing", redis.print);

  // runs immediately
  client.mset("incr_thing", 100, "incr_other_thing", 1, redis.print);

  // drains multi queue and runs atomically
  multi.exec(function (err, replies) {
    console.log(replies); // 101, 2
  });

  // you can re-run the same transaction if you like
  multi.exec(function (err, replies) {
    console.log(replies); // 102, 3
    client.quit();
  });

});

