const dbOptions = require('./db-options');
const knex = require('knex')(dbOptions);

knex.raw("SELECT VERSION()")
	.then(
		(version) => console.log((version[0][0]))
	)
	.catch((err) => { console.log( err); throw err })
	.finally(() => {
		knex.destroy();
	});

