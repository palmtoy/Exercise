const _doFuncFibo = (a, b, curCnt, tmpCnt, retList) => {
	if (curCnt > tmpCnt) {
		return retList;
	}

	retList.push(b);

	return _doFuncFibo(b, a + b, ++curCnt, tmpCnt, retList);
};


const funcFibo = (tmpCnt) => {
	const a = 0
			, b = 1
			, originalList = [a, b];
	let curCnt = originalList.length;
	
	const retList = _doFuncFibo(b, a + b, ++curCnt, tmpCnt, originalList);

	console.log(`Len = ${retList.length}`);
	console.log(`retList = ${retList}`);
};


const tmpCnt = parseInt(process.argv[2]) || 2;

funcFibo(tmpCnt);

