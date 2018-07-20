'use strict';

var restore = require('mongodb-restore');
 
restore({
	uri: 'mongodb://127.0.0.1/trace-source-data', // mongodb://<dbuser>:<dbpassword>@<dbdomain>.mongolab.com:<dbport>/<dbdatabase>
	root: '/tmp', // read backup(s) file(s) from this dir
	tar: 'mongodb-dump-data-' + (new Date()).toLocaleDateString() + '.tar', // restore backup(s) tar file(s) from this dir
	metadata: true,
  drop: true, // drop entire database before restore backup
	logger: '/tmp/mongodb-restore.log' 
});

