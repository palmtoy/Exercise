#include <iostream>
using namespace std;

void Swap(int &a, int &b)
{
    a ^= b;
    b ^= a;
    a ^= b;
}

void HeapBuild(int lst[], int root, int len)
{
    int lchild = root * 2 + 1;
    if (lchild < len)
    {
        int flag = lchild;
        int rchild = lchild + 1;
        if (rchild < len && lst[rchild] > lst[lchild])
        {
            flag = rchild;
        }
        if (lst[root] < lst[flag])
        {
            Swap(lst[root], lst[flag]);
            HeapBuild(lst, flag, len);
        }
    }
}

void HeapSort(int lst[], int root, int len)
{
    for (int i = len / 2; i >= root; i--)
    {
        HeapBuild(lst, i, len);
    }
    for (int j = len - 1; j > 0; j--)
    {
        Swap(lst[0], lst[j]);
        HeapBuild(lst, 0, j);
    }
}

int main()
{
    cout << "HeapSort-T is running ...\n";
    int lst[] = { 1, 3, 4, 5, 7, 2, 6, 8, 0 };
    int len = sizeof(lst) / sizeof(int);
    HeapSort(lst, 0, len);
    for (int i = 0; i < len; i++)
    {
        cout << " " << lst[i] << " ";
    }
}
