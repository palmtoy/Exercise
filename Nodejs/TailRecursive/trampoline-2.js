function trampoline(f) {
	return ((...args) => {
		let fn = f.bind(null, ...args);
		while (typeof fn === 'function') {
			fn = fn();
		}
		return fn;
	});
}

// accumulate function
const accumulate = trampoline(function f(n, sum = 0) {
	if (n <= 0) {
		return sum;
	}
	return (() => f(n - 1, sum + n));
});

const v10 = accumulate(10);
console.log(`     v10 = ${v10}`);

const v100 = accumulate(100);
console.log(`    v100 = ${v100}`);

const v1000 = accumulate(1000);
console.log(`   v1000 = ${v1000}`);

const v10000 = accumulate(10000);
console.log(`  v10000 = ${v10000}`);

const v100000 = accumulate(100000);
console.log(` v100000 = ${v100000}`);

const v1000000 = accumulate(1000000);
console.log(`v1000000 = ${v1000000}`);
