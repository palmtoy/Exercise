#!/usr/bin/env node

const funcSwap = (lst, i, j) => {
	const tmp = lst[i];
	lst[i] = lst[j];
	lst[j] = tmp;
};


const pickMiddleIdx = (lst, left, right) => {
	const middle = Math.floor((left + right) / 2);
	if ((lst[left] - lst[middle]) * (lst[middle] - lst[right]) >= 0) {
		return middle;
	} else if ((lst[middle] - lst[left]) * (lst[left] - lst[right]) >= 0) {
		return left;
	} else {
		return right;
	}
}


const funcPartition = (lst, left, right) => {
	const pIdx = pickMiddleIdx(lst, left, right);
	if (pIdx !== left) {
		funcSwap(lst, left, pIdx);
	}
	const pivot = lst[left];
	let j = left;
	for (let i = left + 1; i <= right; i++) {
		if (lst[i] < pivot) {
			j++;
			if (i !== j) {
				funcSwap(lst, i, j);
			}
		}
	}
	if (j !== left) {
		funcSwap(lst, left, j);
	}
	return j;
};


const quickSort = (lst, left, right) => {
	if (left >= right) {
		return;
	}

	const idx = funcPartition(lst, left, right);
	quickSort(lst, left, idx - 1);
	quickSort(lst, idx + 1, right);
};


const lst = [ 5, 4, 6, 8, 2, 9, 7, 1, 3, 0 ];

quickSort(lst, 0, lst.length - 1);

console.log(`lst = ${lst}`);

