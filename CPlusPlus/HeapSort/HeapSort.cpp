#include <iostream>
#include <time.h>
using namespace std;

// 本例为: 使用大根堆实现数组的升序排列 (同样可以使用小根堆实现数组的降序排列)

//辅助交换函数
void Swap(int &a, int &b)
{
    int temp = a;
    a = b;
    b = temp;
}

//堆排序的核心是建堆, 传入参数为数组, 根节点位置, 数组长度
void HeapBuild(int lst[], int root, int len)
{
    int lchild = root * 2 + 1; //根节点的左子结点下标
    if (lchild < len) //左子结点下标不能超出数组的长度
    {
        int flag = lchild; //flag保存左右节点中最大值的下标
        int rchild = lchild + 1; //根节点的右子结点下标
        if (rchild < len) //右子结点下标不能超出数组的长度(如果有的话)
        {
            if (lst[rchild] > lst[flag]) //找出左右子结点中的最大值
            {
                flag = rchild;
            }
        }
        if (lst[root] < lst[flag])
        {
            //交换父结点和比父结点大的最大子节点
            Swap(lst[root], lst[flag]);
            //从此次最大子节点的那个位置开始递归建堆
            HeapBuild(lst, flag, len);
        }
    }
}

void HeapSort(int lst[], int len)
{
    for (int i = len / 2; i >= 0; --i) //从最后一个非叶子节点的父结点开始建堆
    {
        HeapBuild(lst, i, len);
    }

    for (int j = len - 1; j > 0; --j) //j表示数组此时的长度, 因为len长度已经建过了，从len-1开始
    {
        Swap(lst[0], lst[j]); //交换首尾元素,将最大值交换到数组的最后位置保存
        HeapBuild(lst, 0, j); //去除最后位置的元素重新建堆，此处j表示数组的长度，最后一个位置下标变为len-2
    }
}

int main(int argc, char **argv)
{
    cout << "HeapSort is running ...\n";
    clock_t startTime = clock();
    int lst[] = { 1, 3, 4, 5, 7, 2, 6, 8, 0 };
    int len = sizeof(lst) / sizeof(int);
    HeapSort(lst, len);
    for (int i = 0; i < len; ++i)
    {
        cout << " " << lst[i] << " ";
    }
    clock_t endTime = clock();
    cout << endl << " Total running time is: " << static_cast<double>(endTime - startTime) / CLOCKS_PER_SEC * 1000 << " ms " << endl;
    return 0;
}
