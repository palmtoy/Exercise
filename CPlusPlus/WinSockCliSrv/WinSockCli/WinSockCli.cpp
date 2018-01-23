#include <iostream>
#include <winsock2.h>
#include <ws2tcpip.h>

#pragma comment(lib, "Ws2_32.lib")

using namespace std;

int main(int argc, char *argv[])
{
	string buffer = "Hi ~";

	if(argc > 1)
	{
		buffer = argv[1];
	}

	WSADATA wsa_data;
	SOCKADDR_IN addr;

	WSAStartup(MAKEWORD(2, 0), &wsa_data);
	const auto server = socket(AF_INET, SOCK_STREAM, 0);

	string strIP = "127.0.0.1";
	wstring wstr = wstring(strIP.begin(), strIP.end());
	LPCWSTR pszAddrString = wstr.c_str();
	InetPton(AF_INET, pszAddrString, &addr.sin_addr.s_addr);

	addr.sin_family = AF_INET;
	addr.sin_port = htons(5555);

	connect(server, reinterpret_cast<SOCKADDR *>(&addr), sizeof(addr));
	cout << "Connected to server!" << endl;

	send(server, buffer.c_str(), sizeof(buffer), 0);
	cout << "Message sent!" << endl;

	closesocket(server);
	WSACleanup();
	cout << "Socket closed." << endl << endl;

	char c;
	cin >> c;
}
