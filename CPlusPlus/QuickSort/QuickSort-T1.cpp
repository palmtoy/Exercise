#include <iostream>
using namespace std;

void funcSwap(int &a, int &b)
{
	int tmp = a;
	a = b;
	b = tmp;
}

int funcPartition(int lst[], int left, int right)
{
	int i = left;
	int pivot = lst[left];
	int j = left;
	while (++i <= right)
	{
		if (lst[i] < pivot)
		{
			j++;
			if (i != j)
			{
				funcSwap(lst[i], lst[j]);
			}
		}
	}
	if (j != left)
	{
		funcSwap(lst[left], lst[j]);
	}
	return j;
}

void QuickSort(int lst[], int left, int right)
{
	if (left >= right)
		return;
	int idx = funcPartition(lst, left, right);
	QuickSort(lst, left, idx - 1);
	QuickSort(lst, idx + 1, right);
}

int main(int argc, char *argv[])
{
	cout << "QuickSort-T1 is running ..." << endl;

	int lst[] = {2, 4, 6, 8, 0, 9, 7, 5, 3, 1};
  // int lst[] = {12, 45, 9, 748, 12, 56, 3, 89, 4, 48, 2};
	int len = sizeof(lst) / sizeof(int);

	QuickSort(lst, 0, len - 1);

	for (int i = 0; i < len; i++)
	{
		cout << lst[i] << " ";
	}
}
