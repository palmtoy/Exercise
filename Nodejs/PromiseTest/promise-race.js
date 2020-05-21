#!/usr/bin/env node

const promise0 = new Promise((resolve, reject) => {
	setTimeout(resolve, 1000, 'foo-1s');
});

const promise1 = new Promise((resolve, reject) => {
	setTimeout(resolve, 2000, 'foo-2s');
});

const promise2 = new Promise((resolve, reject) => {
	setTimeout(resolve, 500, 'foo-0.5s');
});

console.log(new Date());

Promise.race([promise0, promise1, promise2]).then((values) => {
	console.log(values);
	console.log(new Date());
});

// expected output: "foo-0.5s"

