#!/usr/bin/env node

const _doFiboFunc = (a, b, curCnt, cnt, retList) => {
	if (curCnt > cnt) {
		return retList;
	}

	retList.push(b);
	return _doFiboFunc(b, a + b, ++curCnt, cnt, retList);
}


const fiboFunc = cnt => {
	const a = 0,
				b = 1,
				originList = [ a, b ];
	let curCnt = originList.length;

	return _doFiboFunc(b, a + b, ++curCnt, cnt, originList);
};


const cnt = parseInt(process.argv[2]) || 9;

const retList = fiboFunc(cnt);

console.log(`fibo(${cnt}) => ${retList}`);

