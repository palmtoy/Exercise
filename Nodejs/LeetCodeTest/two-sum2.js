/**
 *
 * Given an array of integers, return indices of the two numbers such that they add up to a specific target.
 * You may assume that each input would have exactly one solution, and you may not use the same element twice.
 * Example:
 *	 Given nums = [2, 7, 11, 15], target = 9,
 *   Because nums[0] + nums[1] = 2 + 7 = 9,
 *	 return [0, 1].
 *
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

var twoSum = function(nums, target) {
	const len = nums.length;
	let tmpList = [];
	for(let i = 0; i < len; i++) {
		if(nums[i] < target) {
			tmpList.push({k: i, v:nums[i]});
		}
	}
	// console.log(tmpList);

	const len2 = tmpList.length;
	for(let i = 0; i < len2; i++) {
		for(let j = i+1; j < len2; j++) {
			if(tmpList[i].v + tmpList[j].v === target) {
				return [tmpList[i].k, tmpList[j].k];
			}
		}
	}    
};

let nums = [2, 7, 11, 15], target = 9;
console.log(twoSum(nums, target));

