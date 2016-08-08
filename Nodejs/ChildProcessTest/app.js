#!/usr/bin/env node

var fs = require('fs'),
spawn = require('child_process').spawn,
out = fs.openSync('./out.log', 'a'),
err = fs.openSync('./out.log', 'a');

var child = spawn(
	'ls'
	, ['-lh', '/usr']
	, {
			detached: true,
			stdio: [ 'ignore', out, err ]
		}
);

child.unref();

