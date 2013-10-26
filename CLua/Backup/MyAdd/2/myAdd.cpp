#include <iostream>
#include "lua.hpp"
using namespace std;
//编译命令行: g++ -g myAdd.cpp -o myAdd /home/lzg/trunk/3rd/lua/lua-5.1.4_coco-1.1.5/src/liblua.a

int myLuaAdd(lua_State *L, int x, int y)
{
	lua_getglobal(L, "add");
	lua_pushnumber(L, x);
	lua_pushnumber(L, y);
	if (lua_pcall(L, 2, 1, 0) != 0)
	{
		//如果错误，显示 
		cerr << lua_tostring(L, -1) << "\n"; 
		//弹出错误信息所在的最上层栈 
		lua_pop(L, 1); 
	}
	int sum = (int)lua_tonumber(L, -1);
	cout << "sum = " << sum << "\n";
	lua_pop(L, 1);
	return sum;
}	

void myLuaPrt(lua_State *L)
{
	lua_getglobal(L, "prt");
	if (lua_pcall(L, 0, 0, 0) != 0)
	{
		//如果错误，显示 
		cerr << lua_tostring(L, -1) << "\n"; 
		//弹出错误信息所在的最上层栈 
		lua_pop(L, 1); 
	}
}

int main (int argc, char *argv[])
{
	lua_State *L = luaL_newstate();    //初始化lua 
	luaL_openlibs(L);    //载入所有lua标准库 
	/* load the script */
	// luaL_dofile(L, "myAdd.lua"); // 该函数的作用等同于下面两句
	luaL_loadfile(L, "myAdd.lua");
	lua_pcall(L, 0, 0, 0);
	/* call the add function */
 	int sum = myLuaAdd(L, 10, 15);
	/* print the result */
	printf( "The sum is %d\n", sum );
	for (int i = 0; i < 3; i++)
		myLuaPrt(L);
	/* cleanup Lua */
	lua_close(L);
	return 0;
}
