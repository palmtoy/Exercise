// 计算 ( 1 ~ N ) 的累加值 ( 尾递归 )

function f(n, sum = 1) {
	if (n <= 1) {
		return sum;
	}
	return f(n - 1, sum + n);
}

const result = f(8952); // maxValue is 8952; if maxValue bigger than 8952 -> "RangeError: Maximum call stack size exceeded"

console.log(result); // 40073628

