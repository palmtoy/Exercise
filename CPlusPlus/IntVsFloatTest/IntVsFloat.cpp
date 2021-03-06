#include <stdio.h>

int main()
{

    int num = 9; /* num是整型变量，设为9 */

    float fNum = num;

    printf("fNum = %f\n", fNum); /* 显示num的整型值 */

    float *pFloat = (float*)(&num); /* pFloat表示num的内存地址，但是设为浮点数 */

    printf("num的值为：%d\n", num); /* 显示num的整型值 */

    printf("*pFloat的值为：%f\n\n", *pFloat); /* 显示num的浮点值 */

    *pFloat = 9.0; /* 将num的值改为浮点数 */

    printf("num的值为：%d\n", num); /* 显示num的整型值 */

    printf("*pFloat的值为：%f\n", *pFloat); /* 显示num的浮点值 */

    return 0;
}
