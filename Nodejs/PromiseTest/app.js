#!/usr/bin/env node

const promise1 = 9001;

const promise2 = new Promise((resolve, reject) => {
	setTimeout(resolve, 2000, 'foo');
});

const promise3 = Promise.resolve(3);

console.log(new Date());

Promise.all([promise1, promise2, promise3]).then((values) => {
	console.log(values);
	console.log(new Date());
});

// expected output: Array [3, 42, "foo"]

