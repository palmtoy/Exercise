#!/usr/bin/env node


function myPromiseAll(promiseList) {
	return new Promise((resolve, reject) => {
		const values = [];
		let completedNum = 0;
		const len = promiseList.length;
		promiseList.forEach((promiseObj, idx) => {
			if (promiseObj && (typeof promiseObj.then === 'function')) {
				console.log(`A (with then)   : idx = ${idx}`);
				promiseObj.then(v => {
					values[idx] = v;
					completedNum ++;
					if (completedNum >= len) {
						resolve(values);
					}
				});
			} else {
				console.log(`B (without then): idx = ${idx}`);
				values[idx] = promiseObj;
				completedNum ++;
				if (completedNum >= len) {
					resolve(values);
				}
			}
		});
	});
}

const promise0 = 9001;

const promise1 = new Promise((resolve, reject) => {
	setTimeout(resolve, 2000, 'foo');
});

const promise2 = Promise.resolve(3);

console.log(new Date());

myPromiseAll([promise0, promise1, promise2]).then((values) => {
	console.log(values);
	console.log(new Date());
});

// expected output: Array [ 9001, 'foo', 3 ]

