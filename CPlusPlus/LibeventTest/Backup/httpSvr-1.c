// gcc httpSvr.c -o httpSvr.exe -I /usr/local/include -L /usr/local/lib -levent
// http server

#include <sys/types.h>

#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

#include <event.h>
#include <evhttp.h>

void generic_request_handler(struct evhttp_request *req, void *arg)
{
  struct evbuffer *returnbuffer = evbuffer_new();

  evbuffer_add_printf(returnbuffer, "Hi, baby ~ Thanks for the request!");
  evhttp_send_reply(req, HTTP_OK, "Client", returnbuffer);
  evbuffer_free(returnbuffer);
  return;
}

int main(int argc, char **argv)
{
  short          http_port = 6969;
  char          *http_addr = "127.0.0.1";
  struct evhttp *http_server = NULL;

  event_init();
  http_server = evhttp_start(http_addr, http_port);
  evhttp_set_gencb(http_server, generic_request_handler, NULL);

  fprintf(stderr, "Http server started on port %d ...\n", http_port);
  event_dispatch();

  return(0);
}

