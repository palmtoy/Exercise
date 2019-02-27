#include <iostream>
using namespace std;

/*
* 功能：对数组升序快排，递归实现
* 参数：lst：带排序数组，head：数组首元素下标，tail：数组末元素下标
* 返回值：无
*/
void QuickSort(int lst[], int head, int tail)
{
    if (head >= tail)
    {
        return;
    }

    int i = head, j = tail;

    int pivot = lst[head]; // 选取第一个数为基准

    while (i < j)
    {   // i,j 相遇即退出循环
        while (i < j and lst[j] >= pivot)
        {
            j--;
        }
        lst[i] = lst[j]; // 从右向左扫描，将比基准小的数填到左边
        while (i < j and lst[i] <= pivot)
        {
            i++;
        }
        lst[j] = lst[i]; //  从左向右扫描，将比基准大的数填到右边
    }

    lst[i] = pivot; // 将 基准数 填回

    QuickSort(lst, head, i - 1); // 以基准数为界左右分治
    QuickSort(lst, i + 1, tail);
}

int main(int argc, char **argv)
{
    cout << "QuickSort-1 is running ..." << endl;

    int lst[] = {12, 45, 748, 12, 56, 3, 89, 4, 48, 2};
    int len = sizeof(lst) / sizeof(int);

    QuickSort(lst, 0, len - 1);

    for (int i = 0; i < len; ++i)
    {
        cout << " " << lst[i] << " ";
    }
    return 0;
}
