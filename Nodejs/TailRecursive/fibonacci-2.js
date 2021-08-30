function Fibonacci2 (n , ac1 = 1 , ac2 = 1) {
	if( n <= 1 ) {return ac2};

	return Fibonacci2 (n - 1, ac2, ac1 + ac2);
}

const v100 = Fibonacci2(100) // 573147844013817200000
console.log(`v100 = ${v100}`);

const v1000 = Fibonacci2(1000) // 7.0330367711422765e+208
console.log(`v1000 = ${v1000}`);

