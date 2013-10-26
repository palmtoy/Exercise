#include <iostream>
#include "lua.hpp"
using namespace std;
//����������: g++ -g myAdd.cpp -o myAdd /home/lzg/trunk/3rd/lua/lua-5.1.4_coco-1.1.5/src/liblua.a

int myLuaAdd(lua_State *L, int x, int y)
{
	lua_getglobal(L, "add");
	lua_pushnumber(L, x);
	lua_pushnumber(L, y);
	if (lua_pcall(L, 2, 1, 0) != 0)
	{
		//���������ʾ 
		cerr << lua_tostring(L, -1) << "\n"; 
		//����������Ϣ���ڵ����ϲ�ջ 
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
		//���������ʾ 
		cerr << lua_tostring(L, -1) << "\n"; 
		//����������Ϣ���ڵ����ϲ�ջ 
		lua_pop(L, 1); 
	}
}

int main (int argc, char *argv[])
{
	lua_State *L = luaL_newstate();    //��ʼ��lua 
	luaL_openlibs(L);    //��������lua��׼�� 
	/* load the script */
	// luaL_dofile(L, "myAdd.lua"); // �ú��������õ�ͬ����������
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
