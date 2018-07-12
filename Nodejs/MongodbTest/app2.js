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

/*
 * use
 */
var http = require('http');
const port = 3000;

http.createServer(function(req, res) {

  res.writeHead(200, {
    'Content-Type': 'application/x-tar' // force header for tar download
  });

  backup({
    uri: 'mongodb://localhost/trace-source-data',
    collections: [ 'users' ], // save this collection only
    stream: res, // send stream into client response
  });

}).listen(port);

console.log(`Server running at http://127.0.0.1:${port}/`);

