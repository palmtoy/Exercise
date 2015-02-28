var MongoClient = require('mongodb').MongoClient
  , perfixStr = 'performance:'
  , dataStr = require("./data.json");

var numberOfElements = parseInt(process.argv[2]) || 1;

dataStr = JSON.stringify(dataStr);
var timeStr = Date();

MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
  var collection = db.collection('benchmark');
  collection.ensureIndex({id: 1}, {}, console.log);
  collection.remove({}, function(err) { // to remove any element from the database at first
    mongoWrite(collection, db);
  });
});

function mongoWrite(collection, db) {
  console.time('mongoWrite');
  for (var i = 0; i < numberOfElements; i++) {
    collection.insert({id: perfixStr + i, value: i + " ~ " + timeStr + " ~ " + dataStr}, function(err, docs) {
      if(--i === 0) {
        console.timeEnd('mongoWrite');
        mongoRead(collection, db);
      }
    });
  };
}

function mongoRead(collection,db) {
  console.time('mongoRead');
  for (var i = 0; i < numberOfElements; i++) {
    collection.findOne({id: perfixStr + i}, function(err, results) {
      if(--i === 0) {
        console.timeEnd('mongoRead');
        db.close();
      }
    });
  }
}

