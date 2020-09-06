const couchbase = require('couchbase');

const cluster = new couchbase.Cluster('couchbase://127.0.0.1:8091', {
	username: 'Administrator',
	password: '123456',
});

const bucket = cluster.bucket('travel-sample');
const coll = bucket.defaultCollection();

coll.get('airline_10226', (err, res) => {
	if (err) throw err;
	console.log(res.value);
	process.exit(0);
});

