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
 * 对数组a做若干次合并: 数组a的总长度为len, 将它分为若干个长度为gap的子数组,
 * 					 将"每2个相邻的子数组"进行合并排序
 * 参数说明：
 *     a   -- 待排序的数组
 *     len -- 数组的长度
 *     gap -- 子数组的长度
 */
void mergeGroups(int *a, int len, int gap)
{
	int i;
	int twoLen = 2 * gap; // 两个相邻的子数组的长度

	// 将"每2个相邻的子数组"进行合并排序
	for (i = 0; i + 2 * gap - 1 < len; i += (2 * gap))
	{
		mergeArray(a, i, i + gap - 1, i + 2 * gap - 1);
	}

	// 若 (i + gap - 1) < (len - 1), 则剩余一个子数组没有配对
	// 将该子数组合并到已排序的数组中
	if (i + gap - 1 < len - 1)
	{
		mergeArray(a, i, i + gap - 1, len - 1);
	}
}

/*
 * 归并排序(从下往上)
 *
 * 参数说明：
 *     a -- 待排序的数组
 *     len -- 数组的长度
 */
void mergeSortDown2Up(int *a, int len)
{
	int n;

	if (a == NULL || len <= 0)
		return;

	for (n = 1; n < len; n *= 2)
		mergeGroups(a, len, n);
}

int main(int argc, char* argv[])
{
	printf("MergeSort-2(DOWN TO UP) is running ...\n");

	int a[] = { 90, 80, 30, 60, 40, 20, 10, 50, 70 };
	int iLen = sizeof(a) / sizeof(int);

	cout << "Before sort: ";
	for (int i = 0; i < iLen; i++)
		cout << a[i] << " ";
	cout << endl;

	// 归并排序(从下往上)
	mergeSortDown2Up(a, iLen);

	cout << " After sort: ";
	for (int i = 0; i < iLen; i++)
		cout << a[i] << " ";
	cout << endl;

	return 0;
}
