#include <iostream>
#include <boost/noncopyable.hpp>

//这里使用默认的私有继承是可以的
//当然我也可以显示写出private或者publiic修饰词，但效果相同的
class do_not_copy_class : boost::noncopyable
{
};

int main(int argc, char *argv[])
{
    do_not_copy_class test1;
    //编译错误 调用复制构造函数
    do_not_copy_class test2(test1);
    do_not_copy_class test3;
    //编译错误 调用复制赋值操作符
    test3 = test1;
    
    return 0;
}

