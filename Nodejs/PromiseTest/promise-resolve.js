#!/usr/bin/env node

async function foo() {
	setTimeout(function() {
		console.log(`A ~ ${new Date().toString()}, 999`);
	}, 2000);
}

const p = Promise.resolve(foo());

console.log(`B ~ ${new Date().toString()}, typeof p = ${typeof p}, Object.keys(p) = ${Object.keys(p)}`);

