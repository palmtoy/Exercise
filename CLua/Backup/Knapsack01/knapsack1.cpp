/*
问题提出：设有不同价值，不同重量的物品n件，求这n件物品中选取一部分物品的方案，使选中物品的总重量不超过指定的限制重量，但选中物品的价值之和最大。 

问题分析：设n件物品的重量分别为w0, w1, …, w(n-1)，物品的价值分别为v0, v1, …, v(n-1)。采用递归寻找物品的选择方案。设前面已有了多种选择的方案，并保留了其中总价值最大的方案于数组option[], 对第I件物品的选择有两种可能(y/n).

该方案的总价值存于变量maxV。当前正在考察新方案，其物品选择情况保存于数组op[]。假定当前方案已考虑了前(I-1)件物品，现在要考虑第I件物品；当前方案已包含的物品的重量之和为tw；至此，若其余物品都选择是可能的话，本

方案能达到的总价值的期望值设为tv。算法引入tv是一旦当前方案的总价值的期望值也小于前面方案的总价值maxV时，立即去考察下一个方案。对第I件物品的选择有两种可能： 
(1) 物品I被选择，这种可能性仅当包含它不会超过方案总重量的限制时才是可行的。选中后，继续递归去考虑其余物品的选择.
(2) 物品I不被选择，这种可能性仅当不包含物品I也有可能会找到价值更大的方案的情况.
*/

#include<iostream>
#define MaxN 10 //最多物品数
using namespace std;

int limitW = 7; //限制的总重量
int maxV = 0; //存放最优解的总价值
int maxW = 0; //存放最优解的总重量
int n = 4; //实际物品数
int option[MaxN]; //存放最终解
int op[MaxN]; //存放临时解

struct obj
{
	int weight;
	int value;
} A[MaxN]; //存放物品数组

void knap(int i, int tw, int tv)  //考虑第i个物品,tw为当前重量,tv为当前价值
{
	int j;
	if(i > n)   //找到一个叶子结点
		{
			if(tw <= limitW && tv > maxV) //找到一个满足条件的更优解，保存它
				{
					maxV = tv;
					maxW = tw;
					for(j = 1; j <= n; j++)
						option[j] = op[j];
				}
		}
	else
		{
			op[i] = 1;  //选取第i个物品
			knap(i+1, tw+A[i].weight, tv+A[i].value);
			op[i] = 0;    //不选取第i个物品，回溯
			knap(i+1, tw, tv);
		}
}

// 使用递归&回溯算法最终实现了总重量&总价值的穷举比较
int main()
{
 A[1].weight = 5;  A[1].value = 4;
 A[2].weight = 3;  A[2].value = 4;
 A[3].weight = 2;  A[3].value = 3;
 A[4].weight = 1;  A[4].value = 1;
 knap(1, 0, 0); //考虑第1个物品,tw(当前重量)为0,tv(当前价值)为0
 //结果输出
 cout << "选取物品列表:" << endl;
 for(int j = 1; j <= n; j++) {
	 if(option[j] == 1)
		 cout << "第" << j << "种物品" << endl;
 }
 cout << endl << "总重量 = " << maxW << ", 总价值 = " << maxV << endl;
}


