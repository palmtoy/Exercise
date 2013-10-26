// 想要生成动态库时，编译该文件成myHello.o需要使用"-fPIC"参数，编译命令: gcc -c -fPIC myHello.c
#include <stdio.h>

void hello(const char *name)
{
	printf("Hello %s!\n", name);
}

