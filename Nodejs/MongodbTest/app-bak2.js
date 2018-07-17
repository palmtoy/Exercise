'use strict';
/**
 * @file web stream example
 * @module mongodb-backup
 * @subpackage examples
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @license GPLv3
 */

/*
 * initialize module
 */
var backup = require('mongodb-backup');

backup({
	uri: 'mongodb://localhost/trace-source-data',
	root: '/tmp/', // write files into this dir
	collections: [ 'users' ], // save this collection only
	tar: 'mongodb-dump-data-' + (new Date()).toLocaleDateString() + '.tar', // save backup into this tar file
});

