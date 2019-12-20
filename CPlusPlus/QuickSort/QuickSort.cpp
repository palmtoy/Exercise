#include <iostream>
using namespace std;

//交换操作
void Swap(int &a, int &b)
{
    int temp = a;
    a = b;
    b = temp;
}

//标准的快排方法
int PartionStd(int lst[], int left, int right) //首先进行分区操作
{
    int pivot = lst[left]; //将首元素当作标杆，选择最右边元素最为标杆时代码会有略微不同
    int j = left;
    for (int i = left + 1; i <= right; i++) //忽略首元素
    {
        if (lst[i] < pivot)
        {
            j++;
            if (j != i)
            {
                Swap(lst[i], lst[j]); //将标杆数一直往右移动，遇到比标杆数小的就交换到从头开始的位置上
            }
        }
    }
    if (j != left)
    {
        Swap(lst[j], lst[left]); //j位置的元素和首元素(标杆数)互换，即可保证标杆元素左边为小于等于，右边为大于等于
    }
    return j;
}

//取区间内随机数的函数
int Rand(int low, int high)
{
    int size = high - low + 1;
    int rnd = low + rand() % size;
    return rnd;
}

int PartionOptimize(int lst[], int left, int right) //首先进行分区操作
{
    Swap(lst[Rand(left, right)], lst[left]); //随机选择区间的一个数,将其与首元素进行交换
    return PartionStd(lst, left, right);
}

//标准递归版本的快速排序
void QuickSort(int lst[], int left, int right)
{
    if (left < right)
    {
        // int idx = PartionOptimize(lst, left, right); //PartionStd也可以
        int idx = PartionStd(lst, left, right); //PartionOptimize也可以
        QuickSort(lst, left, idx - 1);
        QuickSort(lst, idx + 1, right);
    }
}

int main(int argc, char **argv)
{
    cout << " QuickSort is running ... \n";
    int lst[] = {12, 45, 9, 748, 12, 56, 3, 89, 4, 48, 2};
    int len = sizeof(lst) / sizeof(int);

    QuickSort(lst, 0, len - 1);

    for (int i = 0; i < len; ++i)
    {
        cout << " " << lst[i] << " ";
    }
    return 0;
}
