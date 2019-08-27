function asyncAvg(n, avgCB) {
	// Save ongoing sum in JS closure.
	let sum = 0;
	function helper(i, cb) {
		sum += i;
		if (i === n) {
			cb(sum);
			return;
		}

		// "Asynchronous recursion".
		// Schedule next operation asynchronously.
		setImmediate(helper.bind(null, i+1, cb));
	}

	// Start the helper, with CB to call avgCB.
	helper(1, sum => {
		const avg = sum/n;
		avgCB(avg);
	});
}


const paramStr = process.argv[2];
const n = parseInt(paramStr);
if (!(n >= 0)) {
	console.log(`Your input number is ${paramStr}.\nPlease input a valid number ...`);
	process.exit();
}

const asyncBefore = process.hrtime();
asyncAvg(n, avg => {
	const asyncTook = process.hrtime(asyncBefore);
	console.log('asyncAvg -> avg of 1 to n: ' + avg);
	console.info('asyncAvg execution time (hr): %ds - %dms', asyncTook[0], asyncTook[1] / 1000000);
});

function syncAvg(n) {
	const syncBefore = process.hrtime();
	let sum = 0;
	for(let i = 1; i <= n; i++) {
		sum += i;
	} 
	const avg = sum / n;
	const syncTook = process.hrtime(asyncBefore);
	console.log('syncAvg -> avg of 1 to n: ' + avg);
	console.info('syncAvg execution time (hr): %ds - %dms', syncTook[0], syncTook[1] / 1000000, '\n');
}

syncAvg(n);

