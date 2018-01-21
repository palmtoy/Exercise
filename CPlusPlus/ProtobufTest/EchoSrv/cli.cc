#include <stdio.h>
#include <unistd.h>
#include <strings.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <netdb.h>
#include <string>
#include <iostream>
#include "./EchoSrv.Staff.pb.h"

#define HOSTNAME "localhost"
#define PORT 8080  // the port client will be connecting to
#define MAXDATASIZE 1024  // max number of bytes we can get at once

using std::cout;
using std::endl;
using std::string;

/* simple little function to write an error string and exit */
static void err(const char* s) {
    perror(s);
    exit(EXIT_FAILURE);
}

int main(int argc, char** argv) {
    int fd;
    int numbytes;
    char buf[MAXDATASIZE];
    struct hostent *he;
    struct sockaddr_in server;

    if ((he = gethostbyname(HOSTNAME)) == NULL) {
        err("gethostbyname");
    }

    if ((fd = socket(AF_INET, SOCK_STREAM, 0)) == -1) {
        err("socket");
    }

    bzero(&server, sizeof(server));
    server.sin_family = AF_INET;
    server.sin_port = htons(PORT);
    server.sin_addr = *((struct in_addr *)he->h_addr);

    if (connect(fd, (struct sockaddr *)&server, sizeof(struct sockaddr)) == -1) {
        err("connect");
    }

    string msg;
    EchoSrv::Staff to;
    to.set_id(3769);
    to.set_name("Will");
    to.set_email("will@gmail.com");
    to.SerializeToString(&msg);
    sprintf(buf, "%s", msg.c_str());
    send(fd, buf, sizeof(buf), 0);

    numbytes = recv(fd, buf, MAXDATASIZE, 0);
    buf[numbytes] = '\0';
    string data = buf;
    EchoSrv::Staff p;
    p.ParseFromString(data);
    cout << "Staff:\t" << endl;
    cout << "ID:\t" << p.id() << endl;
    cout << "Name:\t" << p.name() << endl;
    cout << "Email:\t" << p.email() << endl;

    close(fd);
    return 0;
}

