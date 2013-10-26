#include <iostream>
#include <string>
#include "lua.hpp"
using namespace std;

static int counter(lua_State *L);

int newCounter(lua_State *L) {
	lua_pushinteger(L, 0);
	lua_pushcclosure(L, counter, 1);
	return 1;
}

static int counter(lua_State *L) {
	int val = lua_tointeger(L, lua_upvalueindex(1));
	lua_pushinteger(L, ++val);
	lua_pushvalue(L, -1);
	lua_replace(L, lua_upvalueindex(1));
	return 1;
}

int main()
{ 
	lua_State *L = luaL_newstate(); 
	luaL_openlibs(L); 
    
	//放入C函数 
	lua_register(L, "NewCounter", newCounter);
	
	char szLua_code[] = "c1 = NewCounter()\n	c2 = NewCounter()\n	for i = 1, 5 do print(c1()) end\n	print("")\n	for i = 1, 6 do print(c2()) end";     

	//执行 
	bool err = luaL_loadstring(L, szLua_code) || lua_pcall(L, 0, 0, 0); 
	if(err) 
    { 
			cerr << lua_tostring(L, -1); 
			lua_pop(L, 1); 
    } 

	lua_close(L); 
	return 0; 
} 

