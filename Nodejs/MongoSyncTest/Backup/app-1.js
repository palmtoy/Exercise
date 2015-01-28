var Future = require('fibers/future');
var Server = require("mongo-sync").Server;

var server = new Server('127.0.0.1');

Future.task(function() {

  var result = server.db("gam_local").getCollection("user_heroStats").find().toArray();

  console.log(result);

  server.close();

}).detach();

