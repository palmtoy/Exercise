async function foo() {
	console.log(1);
	let a = await 100;
	console.log(a);
	console.log(2);
}

console.log(0);

(async () => {
	await foo();
})();

console.log(3);

/*

output:

0
1
3
100
2

*/

