/*
TCP Echo server example in winsock
Live Server on port 8888
*/
#include <stdio.h>
#include <winsock2.h>
#include <future>
#include "../Include/EchoSrv.Staff.pb.h"
#include "../Include/Utils.h"

#define MAX_CLIENTS 30

int main(int argc, char* argv[])
{
	WSADATA wsa;
	SOCKET master, new_socket, client_socket[MAX_CLIENTS], s;
	struct sockaddr_in server, address;
	int activity, addrlen, i, valread;

	// size of our receive buffer, this is string length.
	int MAXRECV = 1024;
	// set of socket descriptors
	fd_set readfds;
	// 1 extra for null character, string termination
	char* buffer;
	buffer = (char*)malloc((MAXRECV + 1) * sizeof(char));

	for(i = 0; i < MAX_CLIENTS; i++)
	{
		client_socket[i] = 0;
	}

	printf("\nInitialising Winsock ...\t");
	if (WSAStartup(MAKEWORD(2, 2), &wsa) != 0)
	{
		printf("Failed. Error Code : %d", WSAGetLastError());
		exit(EXIT_FAILURE);
	}

	printf("Initialised.\n");

	// Create a socket
	if((master = socket(AF_INET, SOCK_STREAM, 0)) == INVALID_SOCKET)
	{
		printf("Could not create socket: %d", WSAGetLastError());
		exit(EXIT_FAILURE);
	}

	printf("Socket created.\n");

	// Prepare the sockaddr_in structure
	server.sin_family = AF_INET;
	server.sin_addr.s_addr = INADDR_ANY;
	server.sin_port = htons(8888);

	// Bind
	if(bind(master, (struct sockaddr *)&server, sizeof(server)) == SOCKET_ERROR)
	{
		printf("Bind failed with error code: %d", WSAGetLastError());
		exit(EXIT_FAILURE);
	}

	puts("Bind done.");

	// Listen to incoming connections
	listen(master, 3);

	// Accept and incoming connection
	puts("Waiting for incoming connections...");

	addrlen = sizeof(struct sockaddr_in);

	while(TRUE)
	{
		// clear the socket fd set
		FD_ZERO(&readfds);

		// add master socket to fd set
		FD_SET(master, &readfds);

		// add child sockets to fd set
		for (i = 0; i < MAX_CLIENTS; i++)
		{
			s = client_socket[i];
			if(s > 0)
			{
				FD_SET(s, &readfds);
			}
		}

		// waiting for an activity on any of the sockets, timeout is NULL, so wait indefinitely
		activity = select(0, &readfds, NULL, NULL, NULL);

		if (activity == SOCKET_ERROR)
		{
			printf("select call failed with error code: %d", WSAGetLastError());
			exit(EXIT_FAILURE);
		}

		// If something happened on the master socket, then its an incoming connection
		if (FD_ISSET(master, &readfds))
		{
			if ((new_socket = accept(master, (struct sockaddr*)&address, (int*)&addrlen)) < 0)
			{
				perror("accept");
				exit(EXIT_FAILURE);
			}

			// inform user of socket number - used in send and receive commands
			printf("\nNew connection, socket fd is %d, ip is: %s, port: %d \n", new_socket, inet_ntoa(address.sin_addr), ntohs(address.sin_port));

			// add new socket to array of sockets
			for (i = 0; i < MAX_CLIENTS; i++)
			{
				if (client_socket[i] == 0)
				{
					client_socket[i] = new_socket;
					printf("Adding to list of sockets at index %d \n" , i);
					break;
				}
			}
		}

		// else its some IO operation on some other socket
		for (i = 0; i < MAX_CLIENTS; i++)
		{
			s = client_socket[i];
			// if client presend in read sockets             
			if (FD_ISSET(s, &readfds))
			{
				// get details of the client
				getpeername(s, (struct sockaddr*)&address, (int*)&addrlen);

				// Check if it was for closing, and also read the incoming message
				// recv does not place a null terminator at the end of the string (whilst printf %s assumes there is one)
				valread = recv(s, buffer, MAXRECV, 0);

				if (valread == SOCKET_ERROR)
				{
					int error_code = WSAGetLastError();
					if(error_code == WSAECONNRESET)
					{
						// Somebody disconnected, get his details and print
						printf("\nHost disconnected unexpectedly, ip %s, port %d \n", inet_ntoa(address.sin_addr), ntohs(address.sin_port));

						// Close the socket and mark as 0 in list for reuse
						closesocket( s );
						client_socket[i] = 0;
					}
					else
					{
						printf("recv failed with error code: %d", error_code);
					}
				}
				if (valread == 0)
				{
					// Somebody disconnected, get his details and print
					printf("\nHost disconnected, ip %s, port %d \n\n", inet_ntoa(address.sin_addr), ntohs(address.sin_port));

					// Close the socket and mark as 0 in list for reuse
					closesocket( s );
					client_socket[i] = 0;
				}

				// Echo back a new message
				else
				{
					// add null character, if you want to use with printf/puts or other string handling functions
					buffer[valread] = '\0';
					// Receive msg from clients
					std::string strTmp = buffer;
					EchoSrv::Staff msg;
					msg.ParseFromString(strTmp);
					printf("%s:%d - \n", inet_ntoa(address.sin_addr), ntohs(address.sin_port));
					PrintMsg(msg, "\nMessage received from client: Staff -> ");

					std::string strBuffer;
					EchoSrv::Staff msgPong;
					msgPong.set_id(msg.id());
					msgPong.set_name("Lee");
					msgPong.set_email("lee@gmail.com");
					time_t tt = std::chrono::system_clock::to_time_t(std::chrono::system_clock::now());
					msgPong.set_ts(tt);
					msgPong.SerializeToString(&strBuffer);

					send(s, strBuffer.c_str(), strBuffer.length(), 0);
				}
			}
		}
	}

	closesocket(s);
	WSACleanup();

	return 0;
}
