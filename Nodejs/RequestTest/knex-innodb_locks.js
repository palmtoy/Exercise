#!/usr/bin/env node

const _KNEX = require('knex');

const CONF = {
	host: '127.0.0.1',
	user : 'root',
	password : '',
};

const knex = _KNEX({
	client: 'mysql',
	connection: {
		host: CONF.host,
		user: CONF.user,
		password: CONF.password,
		database: 'game1019'
	}
});

knex.on('query', qObj => {
	console.log('knex ~ ' + qObj.sql);
});

const go = async () => {
	console.log('<- Begin ~', new Date().toUTCString(), '~', new Date().getTime());

	await	knex.raw('select * from information_schema.innodb_locks;')
	.then(function(results) {
		if (results && results.length > 0 && results[0].length > 0) {
			console.log(`MySQL lock(s) num  = ${results[0].length}`);
			console.log(`MySQL lock(s) List = ${JSON.stringify(results[0])}`);
			process.exit(1);
		}
	})
	.catch(function(error) {
		console.error(`error = ${JSON.stringify(error)}\n`);
	});

	console.log('End ~', new Date().toUTCString(), '~', new Date().getTime(), '->\n');
};


setInterval(go, 1000);

