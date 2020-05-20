#include <iostream>
using namespace std;

void funcSwap(int &a, int &b)
{
	a ^= b;
	b ^= a;
	a ^= b;
}

void heapBuild(int lst[], int root, int len)
{
	int lChild = root * 2 + 1;
	if (lChild < len)
	{
		int cFlag = lChild;
		int rChild = lChild + 1;
		if (rChild < len && lst[rChild] > lst[lChild])
		{
			cFlag = rChild;
		}
		if (lst[cFlag] > lst[root])
		{
			funcSwap(lst[cFlag], lst[root]);
			heapBuild(lst, cFlag, len);
		}
	}
}

void heapSort(int lst[], int root, int len)
{
	for(int i = len / 2 - 1; i >= 0; i--)
	{
		heapBuild(lst, i, len);
	}

	for(int j = len - 1; j > 0; j--)
	{
		funcSwap(lst[0], lst[j]);
		heapBuild(lst, 0, j);
	}
}

int main()
{
	cout << "HeapSort-T2 is running ..." << endl;
	int lst[] = {9, 1, 3, 4, 5, 7, 2, 6, 8, 0};
	int len = sizeof(lst) / sizeof(int);

	heapSort(lst, 0, len);

	for(int i = 0; i < len; i++) {
		cout << lst[i] << " ";
	}
	return 0;
}
