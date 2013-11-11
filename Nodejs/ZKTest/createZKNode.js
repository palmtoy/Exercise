var zookeeper = require('node-zookeeper-client');
var async = require('async');
var path = require('path')

var client = zookeeper.createClient('localhost:2181');
var zkPath = process.argv[2] || '/pomelo/master';

var tmpL = zkPath.split('/');
if(tmpL.length !== 3 || tmpL[0].length > 0 || tmpL[1].length === 0 || tmpL[2].length === 0) {
  console.log('Please input a valid path (depth=2, like:/pomelo/master).');
  return;
}

client.once('connected', function(){
  console.log('Connected to the server.');

  async.waterfall([
    function(cb){
      client.create(path.dirname(zkPath), function(err4create){
        console.log('1 ~ err4create = ', err4create);
        cb(err4create);
      });
    },
    function(cb){
      client.create(zkPath, function(err4create){
        console.log('2 ~ err4create = ', err4create);
        cb(err4create);
      });
    },
  ], function(err){
    if(err){
      console.log('Failed to create node: %s. Due to: %s.', zkPath, err);
    } else{
      console.log('Node: %s is successfully created.', zkPath);
    }

    client.close();
  });

});

client.connect();

