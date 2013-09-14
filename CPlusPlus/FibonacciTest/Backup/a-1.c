#include <stdio.h>

void fiboFunc(int a, int b, int curCnt, int totalCnt) {
  if(curCnt > totalCnt) {
    return;
  }
  
  printf("%d ~ %d\n", curCnt, a);
  ++curCnt;
  fiboFunc(b, a+b, curCnt, totalCnt);
}

main() {
  int a = 0, b = 1;
  int curCnt = 1, totalCnt = 9;
  printf("%d ~ %d\n", curCnt, a);
  fiboFunc(b, a+b, ++curCnt, totalCnt);
}
