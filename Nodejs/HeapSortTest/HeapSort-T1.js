#!/usr/bin/env node

const funcSwap = (lst, i, j) => {
	const tmp = lst[i];
	lst[i] = lst[j];
	lst[j] = tmp;
}


const buildHeap = (lst, root, len) => {
	const lChild = root * 2 + 1;
	if (lChild >= len) {
		return;
	}
	let fChild = lChild;
	const rChild = lChild + 1;
	if (rChild < len && lst[rChild] > lst[lChild]) {
		fChild = rChild;
	}
	if (lst[fChild] > lst[root]) {
		funcSwap(lst, fChild, root);
		buildHeap(lst, fChild, len);
	}
};


const heapSort = lst => {
	const len = lst.length;
	for (let i = len / 2 - 1; i >= 0; i--) {
		buildHeap(lst, i, len);
	}
	for (let j = len - 1; j > 0; j--) {
		funcSwap(lst, 0, j);
		buildHeap(lst, 0, j);
	}
};


const lst = [ 2, 4, 6, 8, 0, 9, 7, 5, 3, 1 ];

heapSort(lst);

console.log('HeapSort-T1 is running ...');
console.log(`lst = ${lst}`);

