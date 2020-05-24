function funcFact(cnt, p = 1) {
	if (cnt === 0) {
		return p;
	}
	return funcFact(cnt - 1, cnt * p);
}


const cnt = parseInt(process.argv[2]) || 5;
// console.log(`typeof process.argv[2] = ${typeof process.argv[2]}, cnt = ${cnt}`);
// console.log(`process.argv[2] = ${process.argv[2]}, cnt = ${cnt}`);

const ret = funcFact(cnt);

console.log(`${cnt}! = ${ret}`);

