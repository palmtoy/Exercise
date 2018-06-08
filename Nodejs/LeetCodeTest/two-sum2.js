var twoSum = function(nums, target) {
	let tmpMap = {};
	const len = nums.length;
	for(let i = 0; i < len; i++) {
		let complement = target - nums[i];
		let idx = nums.lastIndexOf(complement);
		if(idx !== -1 && idx != i) {
			return [i, idx];
		}
		tmpMap[i] = nums[i];
	}    
};

let nums = [2, 7, 11, 15], target = 9;
console.log(twoSum(nums, target));

nums = [0, 4, 3, 0], target = 0;
console.log(twoSum(nums, target));

nums = [-3, 4, 3, 90], target = 0;
console.log(twoSum(nums, target));

