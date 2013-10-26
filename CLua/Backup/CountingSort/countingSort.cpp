#include <stdio.h>
 
#define k 5
#define lenA 8

int main() {
	int A[lenA + 1] = {-1, 2, 5, 3, 0, 2, 3, 0, 3};
	int B[lenA + 1], C[k + 1];
	// 初始化统计数组
	for(int i = 0; i <= k; i++) {
		C[i] = 0;
	}
	// 统计A中各元素的实际个数
	for(int j = 1; j <= lenA; j++) {
		C[A[j]] = C[A[j]] + 1;
	}
	// 使得C[i]包含小于等于i的元素个数
	for(int i = 1; i <= k; i++) {
		C[i] = C[i] + C[i-1];
	}
	// 将各元素放入B中最终排好序的位置
	for(int j = lenA; j >= 1; j--) {
		B[C[A[j]]] = A[j];
		C[A[j]] = C[A[j]] - 1;
	}
	for(int i = 1; i <= lenA; i++) {
		printf("B[%d] = %d\n", i, B[i]);
	}
	return 0;
}
