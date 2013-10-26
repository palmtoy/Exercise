#include <iostream>
#include <string>
#include "lua.hpp"
using namespace std;


int main()
{ 
	lua_State *L = luaL_newstate(); 
	luaL_openlibs(L); 
	char myStr[] = "Hello world !";

	static char Key = 'k';
	lua_pushlightuserdata(L, (void*)&Key);
	lua_pushstring(L, myStr);
	lua_settable(L, LUA_REGISTRYINDEX);

	lua_pushlightuserdata(L, (void*)&Key);
	lua_gettable(L, LUA_REGISTRYINDEX);
	cout << lua_tostring(L, -1) << endl;

	lua_close(L); 
	return 0; 
} 

