#include <iostream>
#include <string>
#include "lua.hpp"
using namespace std;
//����������: g++ -g cLua.c -o cLua -lm -DLUA_USE_READLINE /home/lzg/trunk/3rd/lua/lua-5.1.4_coco-1.1.5/src/liblua.a
  
int main() 
{ 
	lua_State *L = luaL_newstate();    //��ʼ��lua 
	luaL_openlibs(L);    //��������lua��׼�� 

	cout << "> ";
	string s; 
	while (getline(cin, s))    //��cin�ж���һ�е�s 
	{ 
		//����s���lua�����ִ�� 
		bool err = luaL_loadbuffer(L, s.c_str(), s.length(), "line") || lua_pcall(L, 0, 0, 0); 
		if (err) 
		{ 
				//���������ʾ 
				cerr << lua_tostring(L, -1); 
				//����������Ϣ���ڵ����ϲ�ջ 
				lua_pop(L, 1); 
		} 
		cout << "> ";
	} 

	lua_close(L);//�ر� 
	return 0; 
} 

