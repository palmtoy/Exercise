#include "stdio.h"

struct t1{}; struct t2{}; struct t3{};

void func(t1 arg){ printf("called t1\n"); }
void func(t2 arg){ printf("called t2\n"); }
void func(t3 arg){ printf("called t3\n"); }

int main(void)
{
  t1 x1; t2 x2; t3 x3;
  func(x1);
  func(x2);
  func(x3);
  return 0;
}

