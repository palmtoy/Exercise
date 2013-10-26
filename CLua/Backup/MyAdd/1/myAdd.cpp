#include <iostream>
#include "lua.hpp"
using namespace std;
//编译命令行: g++ -g myAdd.cpp -o myAdd /home/lzg/trunk/3rd/lua/lua-5.1.4_coco-1.1.5/src/liblua.a

int myLuaAdd(lua_State *L, int x, int y)
{
	lua_getglobal(L, "add");
	lua_pushnumber(L, x);
	lua_pushnumber(L, y);
	int ap1 = (int)lua_tonumber(L, 1);
	cout << "ap1 = " << ap1 << "\n";
	int ap2 = (int)lua_tonumber(L, 2);
	cout << "ap2 = " << ap2 << "\n";
	int ap3 = (int)lua_tonumber(L, 3);
	cout << "ap3 = " << ap3 << "\n";
	int ap = (int)lua_tonumber(L, -1);
	cout << "ap = " << ap << "\n";

	// testing code
	lua_getglobal(L, "prt");
	int tp1 = (int)lua_tonumber(L, 1);
	cout << "tp1 = " << tp1 << "\n";
	int tp2 = (int)lua_tonumber(L, 2);
	cout << "tp2 = " << tp2 << "\n";
	int tp3 = (int)lua_tonumber(L, 3);
	cout << "tp3 = " << tp3 << "\n";
	int tp = (int)lua_tonumber(L, -1);
	cout << "tp = " << tp << "\n";
	if (lua_pcall(L, 0, 0, 0) != 0)
	{
		//如果错误，显示 
		cerr << lua_tostring(L, -1) << "\n"; 
		//弹出错误信息所在的最上层栈 
		lua_pop(L, 1); 
	}
	// testing code

	if (lua_pcall(L, 2, 1, 0) != 0)
	{
		//如果错误，显示 
		cerr << lua_tostring(L, -1) << "\n"; 
		//弹出错误信息所在的最上层栈 
		lua_pop(L, 1); 
	}
	int v1 = (int)lua_tonumber(L, 1);
	cout << "v1 = " << v1 << "\n";
	int v2 = (int)lua_tonumber(L, 2);
	cout << "v2 = " << v2 << "\n";
	int v3 = (int)lua_tonumber(L, 3);
	cout << "v3 = " << v3 << "\n";
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
	luaL_loadfile(L, "myAdd.lua");
	int bl1 = (int)lua_tonumber(L, 1);
	cout << "bl1 = " << bl1 << "\n";
	int bl2 = (int)lua_tonumber(L, 2);
	cout << "bl2 = " << bl2 << "\n";
	int bl3 = (int)lua_tonumber(L, 3);
	cout << "bl3 = " << bl3 << "\n";
	int bl = (int)lua_tonumber(L, -1);
	cout << "bl = " << bl << "\n";
	lua_pcall(L, 0, 0, 0);
	int al1 = (int)lua_tonumber(L, 1);
	cout << "al1 = " << al1 << "\n";
	int al2 = (int)lua_tonumber(L, 2);
	cout << "al2 = " << al2 << "\n";
	int al3 = (int)lua_tonumber(L, 3);
	cout << "al3 = " << al3 << "\n";
	int al = (int)lua_tonumber(L, -1);
	cout << "al = " << al << "\n";
	// luaL_dofile(L, "myAdd.lua");
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
