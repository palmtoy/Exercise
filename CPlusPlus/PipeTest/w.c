// 创建命名管道: $ mkfifo myfifo

#include<sys/types.h> 
#include<unistd.h> 
#include<stdio.h> 
#include<stdlib.h> 
#include<errno.h> 
#include<fcntl.h> 
#include<sys/stat.h> 
#define FIFO "./myfifo" /*宏定义 命名管道路径*/ 

int main() 
{ 
  char *msg = "Hi, baby ~"; /*发送数据*/ 
  int fd; 

  fd = open(FIFO, O_WRONLY|O_NONBLOCK, 0); /*打开*/ 

  // if(write(fd, msg, 2) != -1) /*读取*/ 
  if(write(fd, msg, 10) != -1) /*读取*/ 
    printf("Message has been sent to FIFO.\n"); 

  exit(0); 
} 
