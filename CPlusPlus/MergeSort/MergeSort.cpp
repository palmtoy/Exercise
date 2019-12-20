#include <iostream>
using namespace std;

/*
 * 将一个数组中的两个相邻有序区间合并成一个
 * 参数说明:
 *     a       -- 包含两个有序区间的数组
 *     start   -- 第1个有序区间的起始地址
 *     mid     -- 第1个有序区间的结束地址
 *     (mid+1) -- 第2个有序区间的起始地址
 *     end     -- 第2个有序区间的结束地址
 */
void mergeArray(int *a, int start, int mid, int end)
{
	int* tmp = new int[end - start + 1]; // tmp是汇总2个有序区的临时区域
	int i = start;						 // 第1个有序区的索引
	int j = mid + 1;					 // 第2个有序区的索引
	int k = 0;							 // 临时区域的索引

	// 从两个有序区按照从小到大的顺序归并到临时区域数组tmp中去
	while (i <= mid && j <= end)
	{
		if (a[i] <= a[j])
			tmp[k++] = a[i++];
		else
			tmp[k++] = a[j++];
	}

	// 下面的(A), (B)代码块不会同时都得到执行
	// (A): 将前一个有序区中剩余的元素直接放入临时区域数组tmp中去
	while (i <= mid)
		tmp[k++] = a[i++];
	// (B): 将后一个有序区中剩余的元素直接放入临时区域数组tmp中去
	while (j <= end)
		tmp[k++] = a[j++];

	// 将排序后的元素, 全部都整合到数组a中
	for (i = 0; i < k; i++)
		a[start + i] = tmp[i];

	delete[] tmp;
}

/*
 * 归并排序(从上往下)
 * 参数说明：
 *     a     -- 待排序的数组
 *     start -- 数组的起始地址
 *     end   -- 数组的结束地址
 */
void mergeSortUp2Down(int *a, int start, int end)
{
	if (a == NULL || start >= end)
		return;

	int mid = (end + start) / 2;
	mergeSortUp2Down(a, start, mid);   // 递归排序a[start ... mid]
	mergeSortUp2Down(a, mid + 1, end); // 递归排序a[mid+1 ... end]

	// a[start ... mid] 和 a[mid+1 ... end] 是两个有序空间
	// 将它们排序成一个有序空间a[start ... end]
	mergeArray(a, start, mid, end);
}

int main(int argc, char* argv[])
{
	printf("MergeSort(UP TO DOWN) is running ...\n");

	int a[] = { 90, 80, 30, 60, 40, 20, 10, 50, 70 };
	int iLen = sizeof(a) / sizeof(int);

	cout << "Before sort: ";
	for (int i = 0; i < iLen; i++)
		cout << a[i] << " ";
	cout << endl;

	// 归并排序(从上往下)
	mergeSortUp2Down(a, 0, iLen - 1);

	cout << " After sort: ";
	for (int i = 0; i < iLen; i++)
		cout << a[i] << " ";
	cout << endl;

	return 0;
}
