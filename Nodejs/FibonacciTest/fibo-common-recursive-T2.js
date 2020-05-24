function funcFibo(n) {
	if (n <= 0) {
		return 0;
	}
	if (n <= 2) {
		return n - 1;
	}
	return funcFibo(n - 1) + funcFibo(n - 2);
}


const n = parseInt(process.argv[2]) || 11;

const retList = [];
for (let i = 1; i <= n; i++) {
	const ret = funcFibo(i);
	retList.push(ret);
}

console.log(`${retList}`);

// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, ...

