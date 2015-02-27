var MongoClient = require('mongodb').MongoClient
  // , numberOfElements = 50000;
  , numberOfElements = 5;

MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
  var collection = db.collection('benchmark');
  collection.ensureIndex({id: 1}, {}, console.log);
  collection.remove({}, function(err) { // to remove any element from the database at first
    mongoWrite(collection,db);
  });
});

function mongoWrite(collection, db) {
  console.time('mongoWrite');
  for (var i = 0; i < numberOfElements; i++) {
    collection.insert({id: i, value: i + " ~ some fantastic value"}, function(err, docs) {
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
    collection.findOne({id: i}, function(err, results) {
      if(--i === 0) {
        console.timeEnd('mongoRead');
        db.close();
      }
    });
  }
}

