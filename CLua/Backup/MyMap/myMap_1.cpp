#include <iostream>
#include <string>
#include "lua.hpp"
using namespace std;

int l_map(lua_State *L)
{
		luaL_checktype(L, 1, LUA_TTABLE);
		luaL_checktype(L, 2, LUA_TFUNCTION);
		int n = lua_objlen(L, 1);

		for(int i = 1; i <= n; i++)
		{
				lua_pushvalue(L, 2);
				lua_rawgeti(L, 1, i);
				lua_call(L, 1, 1);
				lua_rawseti(L, 1, i);
				for(int j = 1; j <= n; j++)
				{
						lua_rawgeti(L, 1, j);
						cout << lua_tonumber(L, -1) << endl;
						lua_pop(L, 1);
				}
				cout << endl;
		}
		return 0;
}

int main() 
{ 
    lua_State *L = luaL_newstate(); 
    luaL_openlibs(L); 

    char szLua_code[] = "function DoDouble(x) \n\t return 2*x \n\t end";
    //执行 
    bool err = luaL_loadbuffer(L, szLua_code, strlen(szLua_code), "demo") || lua_pcall(L, 0, 0, 0); 
    if(err) 
    { 
        //如果错误，显示 
        cerr << lua_tostring(L, -1) << endl; 
        //弹出栈顶的这个错误信息 
        lua_pop(L, 1); 
    } 
    else 
    { 
				//把一个tabele送给Lua 
				lua_newtable(L);    //新建一个table并压入栈顶
				lua_pushnumber(L, 3);
				lua_rawseti(L, -2, 1);
				lua_pushnumber(L, 6);
				lua_rawseti(L, -2, 2);
				lua_pushnumber(L, 9);
				lua_rawseti(L, -2, 3);
				for(int i = 1; i <= 3; i++)
				{
						lua_rawgeti(L, -1, i);
						cout << lua_tonumber(L, -1) << endl;
						lua_pop(L, 1);
				}
				cout << endl;
				lua_getglobal(L, "DoDouble"); 
				l_map(L);
    }
		for(int i = 1; i <= 3; i++)
		{
				lua_rawgeti(L, 1, i);
				cout << lua_tonumber(L, -1) << endl;
				lua_pop(L, 1);
		}
    lua_close(L); 
    return 0; 
} 

