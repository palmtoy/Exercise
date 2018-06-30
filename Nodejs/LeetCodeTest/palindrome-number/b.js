/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
	if(x < 0) return false;
	let tmpX = x;
	let str = '0';
	while (tmpX > 0) {
		str += tmpX % 10;
		tmpX = Math.floor(tmpX / 10);
	}
	return parseInt(str) === x;
};

console.log(isPalindrome(121)); // true
console.log(isPalindrome(-121)); // false
console.log(isPalindrome(10)); // false
