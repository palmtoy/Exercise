// Read a file from disk, store it in Redis, then read it back from Redis.

var redis = require("redis"),
client = redis.createClient(),
fs = require("fs"),
filename = "github.png";

// Read a file from fs, store it in Redis, get it back from Redis, write it back to fs.

client.select(1, function(err, rep) {
  if(err) {
    return console.log('err = ', err);
  }

  fs.readFile(filename, function (err, data) {
    if (err) throw err
      console.log("Read " + data.length + " bytes from filesystem.");

    client.set(filename, data, redis.print); // set entire file

    client.get(filename, function (err, reply) { // get entire file
      if (err) {
        console.log("Get error: " + err);
      } else {
        fs.writeFile("duplicate_" + filename, reply, function (err) {
          if (err) {
            console.log("Error on write: " + err)
          } else {
            console.log("File written.");
          }
          client.end();
        });
      }
    });
  });

});

