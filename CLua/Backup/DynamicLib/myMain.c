//修改加载动态库的环境变量(既:将当前目录加入其中): export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:.
//测试 myHello(可行性文件) 的连接是否正常的命令: ldd myHello
#include "myHello.h"

int main()
{
	hello("everyone");
	return 0;
}

