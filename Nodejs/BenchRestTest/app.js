var benchrest = require('bench-rest');
var flow = {
	before: [{get: 'http://localhost:8086/greet/palmtoy'}],      // operations to do before anything
	beforeMain: [],  // operations to do before each iteration
	main: [  // the main flow for each iteration
		{get: 'http://localhost:8086/playwith/palmtoy_#{INDEX}'}
	],
	afterMain: [{get: 'http://localhost:8086/bye/palmtoy_#{INDEX}'}],   // operations to do after each iteration
	after: []        // operations to do after everything is done
};

module.exports = flow;

var runOptions = {
	limit: 3,         // concurrent connections
	iterations: 6,  // number of iterations to perform
	prealloc: 100      // only preallocate up to 100 before starting
};
var errors = [];
benchrest(flow, runOptions)
.on('error', function (err, ctxName) { console.error('Failed in %s with err: ', ctxName, err); })
.on('progress', function (stats, percent, concurrent, ips) {
	console.log('Progress: %s complete', percent);
})
.on('end', function (stats, errorCount) {
	console.log('error count: ', errorCount);
	console.log('stats', stats);
});
