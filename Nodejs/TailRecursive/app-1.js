// 计算 ( 1 ~ N ) 的累加值 ( 尾递归 )

const f = async (n, sum = 0) =>  {
	if (n <= 0) {
		return sum;
	}
	return await f(n - 1, sum + n);
}

(async () => {
	// const result = await f(100); // 5050
	const result = await f(5694); // maxValue is 5694; if maxValue bigger than 5694 -> "RangeError: Maximum call stack size exceeded"
	console.log(result); // 16213665
})();
