'use strict';

var backup = require('mongodb-backup');

backup({
	uri: 'mongodb://192.168.0.106/trace-source-data',
	metadata: true,
	root: '/tmp/MyDumpData/', // write files into this dir
	tar: 'mongodb-dump-data-' + (new Date()).toLocaleDateString() + '.tar', // save backup into this tar file
});

