#include <iostream>

struct no_move{}; //两个marker类型
struct has_move{};

struct myValueType{
  public:
    void move(){
      std::cout << "move a myValueType obj." << std::endl;
    }
};

template <typename T> struct traits{
  typedef no_move move_method; //对于traits模板类，默认为无move方法
  void move(T* p){} //默认为无move方法
};

template <> struct traits<myValueType>{
  typedef has_move move_method; //对于myValueType，traits模板偏特化，定义了有move方法
  void move(myValueType* p){
    p->move();
  } //模板特化，有move方法
};

template <typename T> struct Container{
  void move(T* p){
    traits<T>().move(p);
  }
};

int main()
{
  int i = 101;
  int *p1 = &i;
  myValueType v1;
  myValueType *pv = &v1;
  Container<int> c1;
  Container<myValueType> c2;
  c1.move(p1);
  c2.move(pv);
}

