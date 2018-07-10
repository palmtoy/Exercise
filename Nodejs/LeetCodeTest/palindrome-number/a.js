/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
	if(x < 0) return false;
	let str = x.toString();
	let len = str.length;
	let halfLen = Math.floor(len / 2);
	for(let i = 0; i < halfLen; i++) {
		if(str[i] !== str[len-1-i]) {
			return false;
		}
	}
	return true;
};

console.log(isPalindrome(121)); // true
console.log(isPalindrome(-121)); // false
console.log(isPalindrome(10)); // false

