var redis = require("redis"),
client = redis.createClient(), multi;

client.select(1, function(err, rep) {
  if(err) {
    return console.log('err = ', err);
  }

  // start a separate multi command queue
  multi = client.multi([
    ["mget", "global_msg_num", 0, redis.print],
    ["incr", "global_msg_num"],
    ["incr", "global_msg_num"],
    ["incr", "global_msg_num"]
  ]);


  multi.incr("global_msg_num", redis.print);

  // drains multi queue and runs atomically
  multi.exec(function (err, replies) {
    console.log(replies);
  });

  // you can re-run the same transaction if you like
  multi.exec(function (err, replies) {
    console.log(replies);
  });

  setTimeout(function() {
    client.end();
  }, 1000);

});

