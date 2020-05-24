function funcFibo(a, b, curNum, targetN) {
	if (targetN <= 0) {
		return NaN;
	}
	if (targetN <= 2) {
		return targetN - 1;
	}

	if (curNum > targetN) {
		return b;
	}
	return funcFibo(b, a + b, curNum + 1, targetN);
}


const targetN = parseInt(process.argv[2]) || 11;

const ret = funcFibo(0, 1, 3, targetN);

console.log(`fibo(${targetN}) = ${ret}`);

// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, ...

