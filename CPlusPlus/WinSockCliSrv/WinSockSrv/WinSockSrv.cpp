#include <winsock2.h>
#include <future>
#include <iostream>

#pragma comment(lib, "Ws2_32.lib")

using namespace std;

void on_client_connect(SOCKET client);

int main()
{
	WSADATA wsa_data;
	SOCKADDR_IN server_addr, client_addr;

	WSAStartup(MAKEWORD(2, 2), &wsa_data);
	const auto server = socket(AF_INET, SOCK_STREAM, 0);

	USHORT sinPort = 8086;
	server_addr.sin_addr.s_addr = INADDR_ANY;
	server_addr.sin_family = AF_INET;
	server_addr.sin_port = htons(sinPort);

	::bind(server, reinterpret_cast<SOCKADDR *>(&server_addr), sizeof(server_addr));
	listen(server, 0);

	cout << "WinSock server is running on port " << sinPort << " ..." << endl;

	int client_addr_size = sizeof(client_addr);

	for (;;)
	{
		SOCKET client;

		if ((client = accept(server, reinterpret_cast<SOCKADDR *>(&client_addr), &client_addr_size)) != INVALID_SOCKET)
		{
			auto fut = async(launch::async, on_client_connect, client);
		}

		const auto last_error = WSAGetLastError();
		
		if(last_error > 0)
		{
			cout << "Error: " << last_error << endl;
		}
	}
}

void on_client_connect(SOCKET client)
{
	char buffer[1024];

	cout << "\nClient connected ..." << endl;
	recv(client, buffer, sizeof(buffer), 0);

	cout << "Client says: " << buffer << endl;
	memset(buffer, 0, sizeof(buffer));

	closesocket(client);
	cout << "Client disconnected." << endl;
}
