#include "Utils.h"

using namespace std;

void PrintMsg(EchoSrv::Staff& msg, char* cStr)
{
	cout << cStr << endl;
	cout << "ID:\t" << msg.id() << endl;
	cout << "Name:\t" << msg.name() << endl;
	cout << "Email:\t" << msg.email() << endl;
	cout << "Timestamp: " << msg.ts() << endl;
}
