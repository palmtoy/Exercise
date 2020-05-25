const funcFibo = n => {
	if (!n || n < 0) {
		return NaN;
	}
	if (n <= 2) {
		return n - 1;
	}
	let a = 0
		, b = 1
		, ret = 0;
	for (let i = 3; i <= n; i++) {
		ret = a + b;
		a = b;
		b = ret;
	}
	return ret;
}


const n = parseInt(process.argv[2]);

const ret = funcFibo(n);

console.log(`Fibo(${n}) = ${ret}`);

