var MongoClient = require('mongodb').MongoClient
  , perfixStr = 'performance:'
  , dataStr = require("./data.json");

var numberOfElements = parseInt(process.argv[2]) || 1;


MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
  var collection = db.collection('benchmark');
  collection.ensureIndex({id: 1}, {}, console.log);
  mongoWrite(collection, db);
});

function mongoWrite(collection, db) {
  console.time('TimeCost-MongoWrite');
  for (var i = 0; i < numberOfElements; i++) {
    collection.insert({id: perfixStr + i, value: dataStr}, function(err, docs) {
      if(--i === 0) {
        console.timeEnd('TimeCost-MongoWrite');
        mongoRead(collection, db);
      }
    });
  };
}

function mongoRead(collection,db) {
  console.time('TimeCost-MongoRead');
  for (var i = 0; i < numberOfElements; i++) {
    collection.findOne({id: perfixStr + i}, function(err, results) {
      console.log('typeof results = ', typeof results);
      console.log('results = ', results);
      if(--i === 0) {
        console.timeEnd('TimeCost-MongoRead');
        db.close();
      }
    });
  }
}

