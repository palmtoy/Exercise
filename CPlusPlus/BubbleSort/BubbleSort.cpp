#include <iostream>
using namespace std;

void Swap(int &a, int &b)
{
    int temp = a;
    a = b;
    b = temp;
}

void BubbleSort(int lst[], int len)
{
    int tail = len - 1;
    for (int i = 0; i < tail; i++)
    {
        bool exeSwap = false;
        for (int j = 0; j < tail - i ; j++)
        {
            if (lst[j] > lst[j+1]) {
                Swap(lst[j], lst[j+1]);
                exeSwap = true;
            }
        }
        if (!exeSwap) {
            break;
        }
    }
}

int main(int argc, char **argv)
{
    cout << " BubbleSort is running ... \n";

    int lst[] = { 12, 45, 3, 9, 748, 16, 98 };
    // int lst[] = { 1, 2, 3, 4, 5, 6, 7 };
    // int lst[] = { 7, 6, 5, 4, 3, 2, 1 };
    int len = sizeof(lst) / sizeof(int);

    BubbleSort(lst, len);

    for (int i = 0; i < len; ++i)
    {
        cout << " " << lst[i] << " ";
    }
    return 0;
}
