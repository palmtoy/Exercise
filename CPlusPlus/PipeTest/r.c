// 创建命名管道: $ mkfifo myfifo

#include<sys/types.h> 
#include<unistd.h> 
#include<stdio.h> 
#include<stdlib.h> 
#include<errno.h> 
#include<fcntl.h> 
#include<sys/stat.h> 
#include<memory.h> 
#define FIFO "./myfifo" /*使用宏定义路径*/ 

int main() 
{ 
  int fd;/*指向命名管道*/ 
  char buf[100];/*存储数据*/ 

  /*
  if(mkfifo(FIFO, O_CREAT|O_EXCL) < 0) //创建管道
  { 
    perror("Create error!\n"); 
    unlink(FIFO); //清除管道
    exit(0); 
  } 
  */

  fd = open(FIFO, O_RDONLY|O_NONBLOCK, 0); /*打开管道*/ 

  if(fd < 0) 
  { 
    perror("Open error!\n"); 
    unlink(FIFO); 
    exit(0); 
  } 

  while(1) 
  { 
    memset(buf, 0, sizeof(buf)); /*清空buf数组*/ 
    if(read(fd, buf, 100) > 0) /*读取管道*/ 
    { 
      printf("Get message: %s\n", buf); 
    } 
    else 
    { 
      printf("Not receive any message!\n"); 
    } 
    sleep(2); /*休眠*/ 
  } 
} 

