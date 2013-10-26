#include <iostream>
#include <string>
#include "lua.hpp"
using namespace std;
//编译命令行: g++ -g cLua.c -o cLua -lm -DLUA_USE_READLINE /home/lzg/trunk/3rd/lua/lua-5.1.4_coco-1.1.5/src/liblua.a
  
int main() 
{ 
	lua_State *L = luaL_newstate();    //初始化lua 
	luaL_openlibs(L);    //载入所有lua标准库 

	cout << "> ";
	string s; 
	while (getline(cin, s))    //从cin中读入一行到s 
	{ 
		//载入s里的lua代码后执行 
		bool err = luaL_loadbuffer(L, s.c_str(), s.length(), "line") || lua_pcall(L, 0, 0, 0); 
		if (err) 
		{ 
				//如果错误，显示 
				cerr << lua_tostring(L, -1); 
				//弹出错误信息所在的最上层栈 
				lua_pop(L, 1); 
		} 
		cout << "> ";
	} 

	lua_close(L);//关闭 
	return 0; 
} 

