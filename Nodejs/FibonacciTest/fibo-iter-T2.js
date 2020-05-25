const funcFibo = n => {
	if (!n || n < 0) {
		return NaN;
	}

	if (n == 1) {
		return [ 0 ];
	}

	const retList = [ 0, 1 ]; 
	let a = 0
		, b = 1
		, ret = 0;
	for (let i = 3; i <= n; i++) {
		ret = a + b;
		a = b;
		b = ret;
		retList.push(ret);
	}
	return retList;
}


const n = parseInt(process.argv[2]) || 3;

for (let i = 0; i <= n; i++) {
	const retList = funcFibo(i);
	console.log(`Fibo(${i}) => ${JSON.stringify(retList)}`);
}

