#include <iostream>
#include <winsock2.h>
#include <ws2tcpip.h>
#include <chrono>
#include <string>
#include "../Include/EchoSrv.Staff.pb.h"
#include "../Include/Utils.h"

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

	USHORT sinPort = 8888;
	addr.sin_family = AF_INET;
	addr.sin_port = htons(sinPort);

	connect(server, reinterpret_cast<SOCKADDR *>(&addr), sizeof(addr));
	cout << "Connected to server ..." << endl;

	string strBuffer;
	EchoSrv::Staff msgPing;
	msgPing.set_id(3796);
	msgPing.set_name("Will");
	msgPing.set_email("will@gmail.com");
	time_t tt = system_clock::to_time_t(system_clock::now());
	msgPing.set_ts(tt);
	msgPing.SerializeToString(&strBuffer);

	send(server, strBuffer.c_str(), strBuffer.length(), 0);

	PrintMsg(msgPing, "\nMessage sent to server: Staff -> ");

	char cBuffer[1024];
	int numbytes = recv(server, cBuffer, sizeof(cBuffer), 0);
	cBuffer[numbytes] = '\0';
	string data = cBuffer;
	EchoSrv::Staff msgPong;
	msgPong.ParseFromString(data);
	PrintMsg(msgPong, "\nMessage received from server: Staff -> ");

	getchar();

	closesocket(server);
	WSACleanup();
	cout << "\nSocket closed." << endl << endl;

	Sleep(2000);
}
