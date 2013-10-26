#include <stdio.h>
#include <stdlib.h>
 
// #define max 8
#define max 4

// queen[]数组中顺序记录了皇后所在对应行(1,2,3,4,...,8)的列坐标
int queen[max], sum = 0; /* max为棋盘最大坐标 */
 
void show() /* 输出所有皇后的坐标 */
{
    int i;
    for(i = 0; i < max; i++)
    {
			//按照数学习惯坐标输出
			printf("(%d,%d) ~ ", i+1, queen[i]+1);
    }
    printf("\n");
    sum++; // 解的总组数
}
 
bool check(int n) /* 检查当前'列'能否放置皇后 */
{
    int i;
    for(i = 0; i < n; i++) /* 检查'列'和主次对角线上是否可以放置皇后 */
    {
			if(queen[i] == queen[n] || abs(queen[i] - queen[n]) == (n - i))
        {
					// 不可以放
					return false;
        }
    }
		// 可以放
    return true;
}
 
void put(int n) /* 回溯尝试皇后位置,n为横坐标 */
{
	int i;
	for(i = 0; i < max; i++)
    {       
			queen[n] = i; /* 将皇后摆到当前循环到的位置 */
			if(check(n))
        {           
					if(n == max - 1)
            {
							show(); /* 如果全部摆好，则输出所有皇后的坐标 */
            }
					else
            {
							put(n + 1); /* 否则继续摆放下一个皇后 */
            }
        }
    }
}

int main()
{
	// printf("testing ... : abs(3-5) = %d\n\n", abs(3-5));
	put(0); /* 从横坐标为0开始依次尝试 */
	printf("\n共有%d组解.\n", sum);
	return 0;
}
