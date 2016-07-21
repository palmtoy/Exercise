var MongoClient = require('mongodb').MongoClient
	, format = require('util').format;

MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
	if(err) throw err;

	var collection = db.collection('user');

	for(var i = 0; i < 100; i++) {
		var k = i + 1;
		var name = 'Tom_' + k;
		var ts = Date() + ' ~ ' + k;
		collection.insert({uid: k, name: name, ts: ts}, function(err, docs) {});
	}

	setTimeout(function() {
		collection.count(function(err, count) {
			console.log(format("count = %s", count));
		});

		// Locate all the entries using find
		collection.find().toArray(function(err, results) {
			console.dir(results);
		});

		setTimeout(function() {
			// Let's close the db
			db.close();
		}, 1000);
	}, 2000);
});

