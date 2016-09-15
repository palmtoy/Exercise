var MongoClient = require('mongodb').MongoClient
	, format = require('util').format;

MongoClient.connect('mongodb://localhost:27017/gam_local', function(err, db) {
	if(err) throw err;

	var usersTable = db.collection('users');

	usersTable.find({uid: 1000191}, {uid: 1, udid: 1, _id: 0}).toArray(function(err, results) {
		console.dir(results);
		db.close();
	});

});

