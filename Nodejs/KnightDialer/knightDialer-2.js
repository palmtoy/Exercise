/**
 * @param {number} N
 * @return {number}
 */
const knightDialer = function (N) {
	const mod = 1000000007;
	const moves = [[4, 6], [6, 8], [7, 9], [4, 8], [3, 9, 0], [], [1, 7, 0], [2, 6], [1, 3], [2, 4]];

	let result = 0
	for (let i = 0; i < moves.length; i++) {
		result += _knightDialer(i, N, moves) % mod;
	}

	return result;
};

const _knightDialer = function (k, N, moves) {
	if (N === 1) {
		return 1;
	}

	let tmp = 0;
	for (const step of moves[k]) {
			tmp += _knightDialer(step, N-1, moves);
	}

	return tmp
};

const n = parseInt(process.argv[2]);
console.log(knightDialer(n));

