#!/usr/bin/env node

const { PythonShell } = require('python-shell');

const psOptions = {
	mode: 'text',
	pythonPath: 'python3',
	pythonOptions: ['-u'], // get print results in real-time
	scriptPath: './PyScripts',
	args: [30, 6]
};

PythonShell.run('handle-argv.py', psOptions, function (err, results) {
	if (err) throw err;
	// results is an array consisting of messages collected during execution
	console.log('results = %j\n\n... ... ↓\n', results);
	results.map(r => {
		console.log(r);
	});
});

