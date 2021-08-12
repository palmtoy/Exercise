async function foo(idx) {
	console.log(1);

	const a = await 100;
	console.log(a);

	// new Promise(resolve => {
	await new Promise(resolve => {
		setTimeout(() => {
			console.log(new Date().getTime() + ` ~ ${idx} ~ 500`);
			resolve();
		}, 1000);
	});

	console.log(2);
}

console.log(0);

(async () => {
	await foo('A');

	console.log();

	foo('Z');
})();


console.log(3);

/*
	Output ↓

	0
	1
	3
	100
	1628762256986 ~ A ~ 500
	2

	1
	100
	1628762257987 ~ Z ~ 500
	2
*/

