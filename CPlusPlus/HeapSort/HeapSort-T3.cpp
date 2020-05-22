#include <iostream>
using namespace std;

void funcSwap(int &a, int &b) {
	int tmp = a;
	a = b; 
	b = tmp;
}

void heapBuild(int lst[], int root, int len) {
	int lChild = root * 2 + 1;
	if (lChild < len) {
		int cFlag = lChild;
		int rChild = lChild + 1;
		if (rChild < len && lst[rChild] > lst[lChild]) {
			cFlag = rChild;
		}
		if (lst[cFlag] > lst[root]) {
			funcSwap(lst[cFlag], lst[root]);
			heapBuild(lst, cFlag, len);
		}
	}
}

void heapSort(int lst[], int len) {
	for (int i = len / 2 - 1; i >= 0; i--) {
		heapBuild(lst, i, len);
	}
	for (int j = len -1; j > 0; j--) {
		funcSwap(lst[0], lst[j]);
		heapBuild(lst, 0, j);
	}
}

int main(int argc, char **argv) {
	cout << "HeapSort-T3 is running ..." << endl;	

	int lst[] = { 8, 6, 4, 2, 0, 9, 7, 5, 3, 1 };
	int len = sizeof(lst) / sizeof(int);
	heapSort(lst, len);
	
	for (int i = 0; i < len; i++) {
		cout << lst[i] << " ";
	}

	return 0;
}
