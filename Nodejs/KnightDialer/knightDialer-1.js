/**
 * @param {number} N
 * @return {number}
 */
const knightDialer = function (N) {
	const mod = 1000000007;
	const tmpArray = Array(10).fill(1);
	for (let n = 2; n <= N; n++) {
		const a1 = tmpArray[6] + tmpArray[8];
		const a2 = tmpArray[7] + tmpArray[9];
		const a3 = tmpArray[4] + tmpArray[8];
		const a4 = tmpArray[3] + tmpArray[9] + tmpArray[0];
		const a6 = tmpArray[1] + tmpArray[7] + tmpArray[0];
		const a7 = tmpArray[2] + tmpArray[6];
		const a8 = tmpArray[1] + tmpArray[3];
		const a9 = tmpArray[4] + tmpArray[2];
		const a0 = tmpArray[4] + tmpArray[6];
		tmpArray[0] = a0 % mod;
		tmpArray[1] = a1 % mod;
		tmpArray[2] = a2 % mod;
		tmpArray[3] = a3 % mod;
		tmpArray[4] = a4 % mod;
		tmpArray[5] = 0;
		tmpArray[6] = a6 % mod;
		tmpArray[7] = a7 % mod;
		tmpArray[8] = a8 % mod;
		tmpArray[9] = a9 % mod;
	}

	let sum = 0;
	for (const a of tmpArray) {
		sum += a;
	}

	return sum % mod;
};

const n = parseInt(process.argv[2]);
console.log(knightDialer(n));

