/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
	if(x < 0) return false;
	let len = x.toString().length;
	let f = (len % 2 == 0);
	if(f) {
		len /= 2;
	} else {
		len = (len - 1) / 2;
	}
	let str = '0';
	while (len > 0) {
		str += x % 10;
		x = Math.floor(x / 10);
		len--;
	}
	if(f) {
		return parseInt(str) === x;
	} else {
		return parseInt(str) === Math.floor(x / 10);
	}
};

console.log(isPalindrome(121)); // true
console.log(isPalindrome(-121)); // false
console.log(isPalindrome(10)); // false
