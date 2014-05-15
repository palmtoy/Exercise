#include <iostream>
#include <typeinfo>
using namespace std;

struct t1{}; struct t2{}; struct t3{};

template <class A, int I> struct container{
  void callMe(){
    cout << "primary A: " << typeid(A).name() << " I: " << I << endl;
  }
};

template <class A1>  struct container<A1, 25>{
  void callMe(){
    cout << "partial specialization " << typeid(A1).name() << " and 25 " << endl;
  }
};

template <> struct container<t3, 99>{
  void callMe(){
    cout << "complete specialization t3, 99" << endl;
  }
};


int main(void)
{
  container<t1, 10> test1;
  test1.callMe();
  container<t3, 99> test2;
  test2.callMe();
  container<t2, 25> test3;
  test3.callMe();
  container<t3, 25> test4;
  test4.callMe();
  return 0;
}

