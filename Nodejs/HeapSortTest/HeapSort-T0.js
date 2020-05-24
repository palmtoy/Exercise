const funcSwap = (lst, i, j) => {
	const tmp = lst[i];
	lst[i] = lst[j];
	lst[j] = tmp;
}


const buildHeap = (lst, root, len) => {
	let lChild = root * 2 + 1;
	if (lChild >= len) {
		return;
	}
	let cFlag = lChild;
	let rChild = lChild + 1;
	if (rChild < len && lst[rChild] > lst[lChild]) {
		cFlag = rChild;
	}
	if (lst[cFlag] > lst[root]) {
		funcSwap(lst, cFlag, root);
		buildHeap(lst, cFlag, len);
	}
};


const heapSort = (lst) => {
	const len = lst.length;
	for (let i = Math.floor(len / 2 - 1); i >= 0; i--) {
		buildHeap(lst, i, len);
	}
	
	for (let j = len - 1; j > 0; j--) {
		funcSwap(lst, 0, j);
		buildHeap(lst, 0, j);
	}
};


// const lst = [ 2, 4, 6, 8, 0, 9, 7, 5, 3, 1 ];
// const lst = [ 1, 3, 4, 5, 7, 2, 6, 8, 0 ];
const lst = [ 8, 6, 4, 2, 0, 9, 7, 5, 3, 1 ];
heapSort(lst);

console.log(`lst = ${lst}`);
