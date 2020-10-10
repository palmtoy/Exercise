const funcX = (a = 6, b) => {
	console.log(`funcX: a = ${a}, b = ${b}`);
	return a + b;
}

let res = funcX(undefined, 3);

console.log(`funcX: res = ${res}\n`);


const funcY = (a, b = 2) => {
	console.log(`funcY: a = ${a}, b = ${b}`);
	return a + b;
}

res = funcY(8);

console.log(`funcX: res = ${res}`);

