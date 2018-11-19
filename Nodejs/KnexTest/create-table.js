const dbOptions = require('./db-options');
const knex = require('knex')(dbOptions);

const tblName = 'cars';
knex.schema.createTable(tblName, (table) => {
	table.increments('id')
	table.string('name')
	table.integer('price')
	})
	.then(() => console.log(`table:${tblName} created.`))
	.catch((err) => { console.log(err); throw err })
	.finally(() => {
		knex.destroy();
	});

