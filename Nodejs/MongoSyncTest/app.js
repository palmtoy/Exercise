var Server = require("mongo-sync").Server;

var server = new Server('127.0.0.1');

var result = server.db("gam_local").getCollection("users").find().toArray();

console.log(result);

server.close();

