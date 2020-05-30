#include <iostream>
using namespace std;

void Swap(int &a, int &b)
{
    // a ^= b ^= a ^= b;
    a ^= b;
    b ^= a;
    a ^= b;
}

int PartitionStd(int lst[], int left, int right)
{
    int pivot = lst[left];
    int j = left;
    for (int i = left + 1; i <= right; i++)
    {
        if (lst[i] < pivot)
        {
            j++;
            if (i != j)
            {
                Swap(lst[i], lst[j]);
            }
        }
    }
    if (j != left)
    {
        Swap(lst[j], lst[left]);
    }
    return j;
}

void QuickSort(int lst[], int left, int right)
{
    if (left < right)
    {
        int idx = PartitionStd(lst, left, right);
        QuickSort(lst, left, idx - 1);
        QuickSort(lst, idx + 1, right);
    }
}

int main()
{
    cout << "QuickSort-T is running ...\n";
    // int lst[] = {12, 45, 9, 748, 12, 56, 3, 89, 4, 48, 2};
    int lst[] = {2, 4, 6, 8, 0, 9, 7, 5, 3, 1};
    int len = sizeof(lst) / sizeof(int);
    QuickSort(lst, 0, len - 1);
    for (int i = 0; i < len; i++)
    {
        cout << " " << lst[i] << " ";
    }
    return 0;
}
