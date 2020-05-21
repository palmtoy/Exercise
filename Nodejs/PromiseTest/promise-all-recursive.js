#!/usr/bin/env node

function promiseAllRecursive(values) {
	// Base case
	if (values.length === 0) {
		return Promise.resolve([]);
	}

	const [first, ...rest] = values;

	// Calling Promise.resolve on the first value because it could
	// be either a Promise or an actual value.
	return Promise.resolve(first).then(firstResult => {
		return promiseAllRecursive(rest).then(restResults => {
			return [firstResult, ...restResults];
		});
	});
}

const promise0 = 9001;

const promise1 = new Promise((resolve, reject) => {
	setTimeout(resolve, 2000, 'foo');
});

const promise2 = Promise.resolve(3);

console.log(new Date());

promiseAllRecursive([promise0, promise1, promise2]).then((values) => {
	console.log(values);
	console.log(new Date());
});

// expected output: Array [ 9001, 'foo', 3 ]

