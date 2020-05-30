#!/usr/bin/env node

const fiboFunc = n => {
	if (!n || n < 0) {
		return NaN;
	}
	if (n === 1) {
		return [ 0 ];
	}
	
	const retList = [ 0, 1 ];
	let a = 0,
			b = 1;
	for (let i = 3; i <= n; i++) {
		const ret = a + b;
		a = b;
		b = ret;
		retList.push(ret);
	}

	return retList;
};


const cnt = parseInt(process.argv[2]) || 9;

const retList = fiboFunc(cnt);

console.log(`fibo(${cnt}) => ${retList}`);

