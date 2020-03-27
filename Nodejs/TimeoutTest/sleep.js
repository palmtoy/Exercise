function sleep (paramTime = 0) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve();
		}, paramTime);
	});
}


(async () => {
	let t1 = new Date();
	console.log(`t1 = ${t1}\n`);
	t1 = +t1;

	console.log('  开始延迟: 0ms');
	console.time('    总延迟');

	console.time('第一次延迟');
	await sleep(2000);
	console.timeEnd('第一次延迟');

	console.time('第二次延迟');
	await sleep(3000);
	console.timeEnd('第二次延迟');

	console.timeEnd('    总延迟');

	let t2 = new Date();
	console.log(`\nt2 = ${t2}`);
	t2 = +t2;
	console.log(`\nt2 - t1 = ${t2 - t1}ms`);
})();

