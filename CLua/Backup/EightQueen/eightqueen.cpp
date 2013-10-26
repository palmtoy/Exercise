#include <stdio.h>
#include <stdlib.h>
 
// #define max 8
#define max 4

// queen[]������˳���¼�˻ʺ����ڶ�Ӧ��(1,2,3,4,...,8)��������
int queen[max], sum = 0; /* maxΪ����������� */
 
void show() /* ������лʺ������ */
{
    int i;
    for(i = 0; i < max; i++)
    {
			//������ѧϰ���������
			printf("(%d,%d) ~ ", i+1, queen[i]+1);
    }
    printf("\n");
    sum++; // ���������
}
 
bool check(int n) /* ��鵱ǰ'��'�ܷ���ûʺ� */
{
    int i;
    for(i = 0; i < n; i++) /* ���'��'�����ζԽ������Ƿ���Է��ûʺ� */
    {
			if(queen[i] == queen[n] || abs(queen[i] - queen[n]) == (n - i))
        {
					// �����Է�
					return false;
        }
    }
		// ���Է�
    return true;
}
 
void put(int n) /* ���ݳ��Իʺ�λ��,nΪ������ */
{
	int i;
	for(i = 0; i < max; i++)
    {       
			queen[n] = i; /* ���ʺ�ڵ���ǰѭ������λ�� */
			if(check(n))
        {           
					if(n == max - 1)
            {
							show(); /* ���ȫ���ںã���������лʺ������ */
            }
					else
            {
							put(n + 1); /* ��������ڷ���һ���ʺ� */
            }
        }
    }
}

int main()
{
	// printf("testing ... : abs(3-5) = %d\n\n", abs(3-5));
	put(0); /* �Ӻ�����Ϊ0��ʼ���γ��� */
	printf("\n����%d���.\n", sum);
	return 0;
}
