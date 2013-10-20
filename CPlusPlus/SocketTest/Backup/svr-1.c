/*************************************
  文件名： server.c
  Linux下socket网络编程简例  - 服务端程序
  服务器端口设为 8080   （端口和地址可根据实际情况更改，或者使用参数传入）
  服务器地址设为 localhost
*/

#include <stdlib.h>
#include <sys/types.h>
#include <stdio.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <string.h>

int main()
{
  int sfd, nfd; /* 定义两个描述符 */
  int flag = 1, len = sizeof(int);
  struct sockaddr_in s_add, c_add;
  int sin_size;
  unsigned short portNum = 8080; /* 服务端使用端口 */

  sfd = socket(AF_INET, SOCK_STREAM, 0);
  if(-1 == sfd)
  {
    printf("socket fail !\r\n");
    return -1;
  }
  printf("socket ok !\r\n");

  /* 初始化服务器端口地址信息 */
  bzero(&s_add,sizeof(struct sockaddr_in));
  s_add.sin_family = AF_INET;
  s_add.sin_addr.s_addr = htonl(INADDR_ANY);
  s_add.sin_port = htons(portNum);

  if(-1 == setsockopt(sfd, SOL_SOCKET, SO_REUSEADDR, &flag, len))
  { 
    perror("setsockopt"); 
    exit(1); 
  } 

  /* 使用bind进行绑定端口 */
  if(-1 == bind(sfd, (struct sockaddr *)(&s_add), sizeof(struct sockaddr)))
  {
    printf("bind fail !\r\n");
    return -1;
  }
  printf("bind ok !\r\n");
  /* 开始监听相应的端口 */
  if(-1 == listen(sfd, 5))
  {
    printf("listen fail !\r\n");
    return -1;
  }
  printf("Listen ok, on port %d ... \r\n", portNum);

  while(1)
  {
    sin_size = sizeof(struct sockaddr_in);
    /* accept服务端使用函数，调用时即进入阻塞状态，等待用户进行连接，在没有客户端进行连接时，程序停止在此处 */
    nfd = accept(sfd, (struct sockaddr *)(&c_add), &sin_size);
    if(-1 == nfd)
    {
      printf("accept fail !\r\n");
      return -1;
    }
    printf("accept ok!\r\nServer start get connect from %#x : %#x\r\n", ntohl(c_add.sin_addr.s_addr), ntohs(c_add.sin_port));

    /* 这里使用write向客户端发送信息*/
    char echoStr[] = "Hello baby, welcome to my server!\r\n";
    if(-1 == write(nfd, echoStr, strlen(echoStr)))
    {
      printf("write fail!\r\n");
      return -1;
    }
    printf("write ok!\r\n");
    close(nfd);
  }
  close(sfd);
  return 0;
}

