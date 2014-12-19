var redis = require("redis"),
client = redis.createClient({detect_buffers: true});

client.select(1, function(err, rep) {
  if(err) {
    return console.log('err = ', err);
  }

  client.set("foo_rand", "Hello World");

  // This will return a JavaScript String
  client.get("foo_rand", function (err, reply) {
    console.log(reply.toString()); // Will print `Hello World`
  });

  // This will return a Buffer since original key is specified as a Buffer
  client.get(new Buffer("foo_rand"), function (err, reply) {
    console.log(reply); // Will print `<Buffer 48 65 6c 6c 6f 20 57 6f 72 6c 64>`
    console.log(reply.toString()); // Will print `Hello World`
  });

  setTimeout(function() {
    client.end();
  }, 1500);
});

