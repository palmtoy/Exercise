/**
 * @param {number} N
 * @return {number}
 */

/*

def knightDialer(self, N):
        MOD = 10**9 + 7
        moves = [[4,6],[6,8],[7,9],[4,8],[3,9,0],[],
                     [1,7,0],[2,6],[1,3],[2,4]]

        dp = [1] * 10
        for hops in xrange(N-1):
            dp2 = [0] * 10
            for node, count in enumerate(dp):
                for nei in moves[node]:
                    dp2[nei] += count
                    dp2[nei] %= MOD
            dp = dp2
        return sum(dp) % MOD

*/

const knightDialer = function (N) {
	const mod = 1000000007;
	const moves = [[4, 6], [6, 8], [7, 9], [4, 8], [3, 9, 0], [], [1, 7, 0], [2, 6], [1, 3], [2, 4]];
	const dp = Array(10).fill(1);

	for (const hops = 0; hops < N; hops++) {
		const dp2 = Array(10).fill(0);
		for (const node in dp) {
			for (const nei in moves[node]) {
					dp2[nei] += count;
					dp2[nei] %= mod;
			}
		}
		for node, count in enumerate(dp):
				for nei in moves[node]:
					dp2[nei] += count
					dp2[nei] %= MOD
		dp = dp2
	}

	return sum(dp) % MOD
};

const n = parseInt(process.argv[2]);
console.log(knightDialer(n));


