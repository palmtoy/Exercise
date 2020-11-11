const l1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

l1.sort(() => {
	return 0.5 - Math.random();
})

console.log(`l1 = ${JSON.stringify(l1)}\n`);

////////////////////////////////////////////

let l2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const funcShuffle = (arr) => {
	let n = arr.length;
	let rdm = 0;
	while(n > 0){
		rdm = Math.floor(Math.random() * n--);
		[arr[n], arr[rdm]] = [arr[rdm], arr[n]] // ES6的结构赋值实现变量互换
	}
	return arr;
}

l2 = funcShuffle(l2);

console.log(`l2 = ${JSON.stringify(l2)}`);

