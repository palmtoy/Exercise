var Fiber = require('fibers');
var Server = require("mongo-sync").Server;

var server = new Server('127.0.0.1');

Fiber(function() {

  var result = server.db("gam_local").getCollection("user_heroStats").find().toArray();

  console.log(result);

  server.close();

}).run();

