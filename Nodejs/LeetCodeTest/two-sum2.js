var twoSum = function(nums, target) {
	let tmpMap = {};
	const len = nums.length;
	for(let i = 0; i < len; i++) {
		let complement = target - nums[i];
		if(tmpMap[complement] !== undefined) {
			return [tmpMap[complement], i];
		}
		tmpMap[nums[i]] = i;
	}    
};

let nums = [2, 7, 11, 15], target = 9;
console.log(twoSum(nums, target));

nums = [0, 4, 3, 0], target = 0;
console.log(twoSum(nums, target));

nums = [-3, 4, 3, 90], target = 0;
console.log(twoSum(nums, target));

