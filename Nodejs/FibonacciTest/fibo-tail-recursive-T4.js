function funcFibo(a, b, curNum, targetN, retList) {
	if (curNum > targetN) {
		return b;
	}
	const curRet = a + b;
	retList.push(curRet);
	return funcFibo(b, curRet, curNum + 1, targetN, retList);
}


let targetN = parseInt(process.argv[2]) || 0;

let retList = NaN;
let ret = NaN;
if (targetN <= 0) {
} else if (targetN === 1) {
	ret = 0;
	retList = [0];
} else if (targetN === 2) {
	ret = 1;
	retList = [0, 1];
} else if (targetN > 2) {
	retList = [0, 1];
	ret = funcFibo(0, 1, 3, targetN, retList);
}

console.log(`fibo(${targetN}) = ${ret}`);
console.log(`retList = ${retList}`);

// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, ...

