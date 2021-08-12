
async function foo() {
	console.log(1);

	const a = await 100;
	console.log(a);

	await new Promise(resolve => {
		setTimeout(() => {
			console.log('500');
			resolve();
		}, 1000);
	});

	console.log(2);
}

console.log(0);

(async () => {
	await foo();

	console.log();

	foo();
})();


console.log(3);

/*
output ↓

0
1
3
100
500
2

1
100
500
2
*/

