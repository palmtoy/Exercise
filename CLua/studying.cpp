#include <stdio.h>
 
#define k 5
#define lenA 8

int main() {
	int A[lenA + 1] = {-1, 2, 5, 3, 0, 2, 3, 0, 3};
	int B[lenA + 1], C[k + 1];
	// ��ʼ��ͳ������
	for(int i = 0; i <= k; i++) {
		C[i] = 0;
	}
	// ͳ��A�и�Ԫ�ص�ʵ�ʸ���
	for(int j = 1; j <= lenA; j++) {
		C[A[j]] = C[A[j]] + 1;
	}
	// ʹ��C[i]����С�ڵ���i��Ԫ�ظ���
	for(int i = 1; i <= k; i++) {
		C[i] = C[i] + C[i-1];
	}
	// ����Ԫ�ط���B�������ź����λ��
	for(int j = lenA; j >= 1; j--) {
		B[C[A[j]]] = A[j];
		C[A[j]] = C[A[j]] - 1;
	}
	for(int i = 1; i <= lenA; i++) {
		printf("B[%d] = %d\n", i, B[i]);
	}
	return 0;
}
