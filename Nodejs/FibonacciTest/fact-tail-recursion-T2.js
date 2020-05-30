#!/usr/bin/env node

const factRecursive = (n, p = 1) => {
	if (n === 0) {
		return p;
	}
	return factRecursive(n - 1, n * p);
}


const n = parseInt(process.argv[2]) || 5;

const ret = factRecursive(n);

console.log(`${n}! = ${ret}`);

