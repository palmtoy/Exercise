// ��Ҫ���ɶ�̬��ʱ��������ļ���myHello.o��Ҫʹ��"-fPIC"��������������: gcc -c -fPIC myHello.c
#include <stdio.h>

void hello(const char *name)
{
	printf("Hello %s!\n", name);
}

