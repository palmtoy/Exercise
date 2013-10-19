// g++ app.c -o app.exe -I /usr/local/include -L /usr/local/lib -levent
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <stdio.h>
#include <string.h>
#include <event.h>

//定义服务端口
#define PORT 6969
//定义监听连接请求的最大队列数
#define BACKLOG 5

//当有连接请求时会触发该函数
void on_accept(int sock, short event, void *arg)
{
  printf("Hello, Welcome to use libevent...\n");
}

int main(int argc, char *argv[]){
  //创建套接字
  int sock = socket(AF_INET, SOCK_STREAM, 0);
  //设置套接字属性 端口复用
  int optval = 1;
  setsockopt(sock, SOL_SOCKET, SO_REUSEADDR, &optval, sizeof(int));

  struct sockaddr_in addr;
  memset(&addr, 0, sizeof(sockaddr_in));
  addr.sin_family = AF_INET;
  addr.sin_port = htons(PORT);
  addr.sin_addr.s_addr = htonl(INADDR_ANY);

  //绑定
  bind(sock, (struct sockaddr*)&addr, sizeof(sockaddr_in));
  //监听
  listen(sock, BACKLOG);

  //获取一个event_base指针
  struct event_base *base = event_base_new();
  //获取一个event指针
  struct event *listen_event = event_new(base, sock, EV_READ|EV_PERSIST, on_accept, NULL);
  event_base_set(base, listen_event);
  //添加事件
  event_add(listen_event, NULL);
  //事件分发、运行
  event_base_dispatch(base);

  return 0;
}

