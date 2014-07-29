#include <iostream>
#include <typeinfo>
using namespace std;

struct t1{}; struct t2{}; struct t3{};

template <class A, int I> struct container{
  void callMe(){
    cout << "primary A: " << typeid(A).name() << " \tI: " << I << endl;
  }
};

int main(void)
{
  container<t3, 10> test;
  test.callMe();
  return 0;
}

