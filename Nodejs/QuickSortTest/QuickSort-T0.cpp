#!/usr/bin/env node

const funcSwap = (lst, i, j) => {
	const tmp = lst[i];
	lst[i] = lst[j];
	lst[j] = tmp;
}


const funcPartition = (lst, left, right) => {
	let pivot = lst[left];
	let j = left;
	for (let i = left + 1; i <= right; i++) {
		if (lst[i] < pivot) {
			j++;
			if (i !== j) {
				funcSwap(lst, i, j)
			}
		}
	}

	if (j !== left) {
		funcSwap(lst, left, j)
	}
	return j;
}


const quickSort = (lst, left, right) => {
	if (left >= right) {
		return;
	}

	const idx = funcPartition(lst, left, right);
	quickSort(lst, left, idx - 1);
	quickSort(lst, idx + 1, right);
}


const lst = [ 2, 4, 6, 8, 0, 9, 7, 5, 3, 1 ];

quickSort(lst, 0, lst.length - 1);

console.log(`lst = ${lst}`);

