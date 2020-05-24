#include <iostream>
using namespace std;

void funcSwap(int &a, int &b)
{
	int tmp = a;
	a = b;
	b = tmp;
}

void quickSort(int lst[], int low, int high)
{
	if (low >= high)
		return;

	int i = low;
	int j = high + 1;
	int pFlag = lst[low];
	while (i < j)
	{
		// 从左向右找比 pFlag 大的值
		while (i < high)
		{
			if (lst[++i] > pFlag)
			{
				break;
			}
		}
		// 从右向左找比 pFlag 小的值
		while ( j > low)
		{
			if (lst[--j] < pFlag)
			{
				break;
			}
		}
		if (i < j)
		{
			// 交换i, j对应的值
			funcSwap(lst[i], lst[j]);
		}
	}
	// 中枢值与j对应值交换
	funcSwap(lst[low], lst[j]);
	quickSort(lst, low, j - 1);
	quickSort(lst, j + 1, high);
}

int main(int argc, char **argv)
{
	cout << "QuickSort-T2 is running ..." << endl;
	int lst[] = {2, 4, 6, 8, 0, 9, 7, 5, 3, 1};
	// int lst[] = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
	// int lst[] = {9, 8, 7, 6, 5, 4, 3, 2, 1, 0};
	int len = sizeof(lst) / sizeof(int);

	quickSort(lst, 0, len - 1);

	for (int i = 0; i < len; i++)
	{
		cout << lst[i] << " ";
	}
	return 0;
}
