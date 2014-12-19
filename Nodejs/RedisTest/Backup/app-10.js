var redis  = require("redis"),
client = redis.createClient(), multi;

client.select(1, function(err, rep) {
  if(err) {
    return console.log('err = ', err);
  }

  client.multi([
    ["mget", "multifoo", "multibar", redis.print],
    ["incr", "multifoo"],
    ["incr", "multibar"]
  ]).exec(function (err, replies) {
    console.log(replies);
    client.quit();
  });
});

