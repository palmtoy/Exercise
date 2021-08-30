function Fibonacci (n) {
	if ( n <= 1 ) return 1;

	return Fibonacci(n - 1) + Fibonacci(n - 2);
}

const v = Fibonacci(10); // 89

// const v = Fibonacci(100) // 超时

console.log(`v = ${v}`);


