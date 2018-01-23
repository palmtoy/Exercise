#include <iostream>
#include <winsock2.h>
#include <ws2tcpip.h>
#include <chrono>
#include <string>

#pragma comment(lib, "Ws2_32.lib")

using namespace std;
using namespace std::chrono;

int main(int argc, char *argv[])
{
	string strBuffer = "Hi ~ ";
	time_t tt = system_clock::to_time_t(system_clock::now());
	strBuffer += std::to_string(tt);

	if(argc > 1)
	{
		strBuffer = argv[1];
	}

	WSADATA wsa_data;
	SOCKADDR_IN addr;

	WSAStartup(MAKEWORD(2, 0), &wsa_data);
	const auto server = socket(AF_INET, SOCK_STREAM, 0);

	string strIP = "127.0.0.1";
	wstring wstr = wstring(strIP.begin(), strIP.end());
	LPCWSTR pszAddrString = wstr.c_str();
	InetPton(AF_INET, pszAddrString, &addr.sin_addr.s_addr);

	USHORT sinPort = 8086;
	addr.sin_family = AF_INET;
	addr.sin_port = htons(sinPort);

	connect(server, reinterpret_cast<SOCKADDR *>(&addr), sizeof(addr));
	cout << "Connected to server ..." << endl;

	send(server, strBuffer.c_str(), sizeof(strBuffer), 0);
	cout << "Message sent -> " << strBuffer.c_str() << endl;

	closesocket(server);
	WSACleanup();
	cout << "Socket closed." << endl << endl;

	Sleep(3000);
}
