let minNum = -Math.pow(2, 31);
let maxNum = Math.pow(2, 31) - 1;

/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
	const f = x >= 0 ? 1 : -1;
	x = f * x;
	let str = '0';
	while(x > 0) {
		str += x % 10;
		x = Math.floor(x / 10);
	}
	let ret = f * parseInt(str);
	return ret > (Math.pow(2, 31) - 1) || ret < (-Math.pow(2, 31)) ? 0 : ret;
};

console.log(reverse(123)); // 321
console.log(reverse(-123)); // -321
console.log(reverse(120)); // 21
console.log(reverse(1534236469)); // 0

