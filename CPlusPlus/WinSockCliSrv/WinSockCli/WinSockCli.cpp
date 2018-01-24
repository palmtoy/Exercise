#include <iostream>
#include <winsock2.h>
#include <ws2tcpip.h>
#include <chrono>
#include <string>
#include "../Include/EchoSrv.Staff.pb.h"

using namespace std;
using namespace std::chrono;

int main(int argc, char *argv[])
{
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

	string strBuffer;
	EchoSrv::Staff to;
	to.set_id(3796);
	to.set_name("Will");
	to.set_email("will@gmail.com");
	time_t tt = system_clock::to_time_t(system_clock::now());
	to.set_ts(tt);
	to.SerializeToString(&strBuffer);

	send(server, strBuffer.c_str(), strBuffer.length(), 0);

	cout << "Message sent: Staff -> " << endl;
	cout << "ID:\t" << to.id() << endl;
	cout << "Name:\t" << to.name() << endl;
	cout << "Email:\t" << to.email() << endl;
	cout << "Timestamp: " << to.ts() << endl;

	closesocket(server);
	WSACleanup();
	cout << "Socket closed." << endl << endl;

	Sleep(2000);
}
