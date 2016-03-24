#!/usr/bin/env node

var fs = require('fs');
var exec = require('child_process').exec;
var data = require('./data.json');

var tmpPath = '/Users/will/Workspace/Projects/gam_new/sparx_gam/node_modules/';

function foo(k, v) {
	fs.readdir(tmpPath, function(err, files) {
		files.forEach(function(f) {
			if(k != f) {
				return;
			}

			var tmpCmdA = 'cd ' + tmpPath + f + ';' + 'git log -n1 | grep "commit" | awk -F\' \' \'{print $2}\' | head -1';

			exec(tmpCmdA,
					 function(errorA, stdoutA, stderrA) {
						 if(errorA !== null) {
							 console.log('exec errorA: ' + errorA);
							 return;
						 } else {
							 if(stdoutA && stdoutA.length > 0) {
								 stdoutA = stdoutA.slice(0, -1);
								 var msg = '"' + k + '": "' + v + stdoutA + '",';
								 console.log(msg);
							 }
						 }
					 });
		});
	});
}


for(var k in data) {
	foo(k, data[k]);
}

