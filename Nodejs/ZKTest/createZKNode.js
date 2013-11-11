var zookeeper = require('node-zookeeper-client');
var async = require('async');
var path = require('path')

var client = zookeeper.createClient('localhost:2181');
// var zkPath = process.argv[2];
var zkPath = '/pomelo/master';

client.once('connected', function(){
  console.log('Connected to the server.');

  async.waterfall([
    function(cb) {
      client.create(path.dirname(zkPath), function(err4create){
        cb(err4create);
      });
    },
    function(cb) {
      client.create('/pomelo/master', function(err4create){
        cb(err4create);
      });
    },
  ], function (err) {
    if(err){
      console.log('Failed to create node: %s due to: %s.', zkPath, err);
    } else{
      console.log('Node: %s is successfully created.', zkPath);
    }

    client.close();
  });

});

client.connect();
