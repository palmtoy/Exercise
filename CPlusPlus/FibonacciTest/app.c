// `-O1`: tail recursion optimization
// gcc app.c -O1 -o a.out

#include <stdio.h>

void foo(int n) {
  printf("n  = %d\n", n);
  return foo(n+1);
}

int main() {
 foo(0);
 return 0;
}

