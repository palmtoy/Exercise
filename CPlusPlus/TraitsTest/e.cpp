#include <iostream>
#include <typeinfo>

struct t1{}; struct t2{}; struct t3{};

using namespace std;

template <class A, class B, class C> void func(A a1, B a2, C a3)
{
  cout << "A: " << typeid(a1).name() << endl;
  cout << "B: " << typeid(a2).name() << endl;
  cout << "C: " << typeid(a3).name() << endl;
}

int main(void)
{
  t1 x1; t2 x2; t3 x3;
  func(x1, x2, x3);
  return 0;
}

