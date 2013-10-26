#include <iostream>
#include <string>
#include "lua.hpp"
using namespace std;


int l_split(lua_State *L)
{
	const char *s = luaL_checkstring(L, 1);
	const char *sep = luaL_checkstring(L, 2);
	const char *e;
	lua_newtable(L);
	int i = 1;
	while((e = strchr(s, *sep)) != NULL) {
		lua_pushlstring(L, s, e-s);
		lua_rawseti(L, -2, i++);
		s = e + 1;
	}
	lua_pushstring(L, s);
	lua_rawseti(L, -2, i);
	return 1;
}

int main()
{ 
	lua_State *L = luaL_newstate(); 
	luaL_openlibs(L); 
	lua_pushstring(L, "hi,ho,there");
	lua_pushstring(L, ",");
	l_split(L);
	luaL_checktype(L, -1, LUA_TTABLE);
	int n = lua_objlen(L, -1);
	for(int i = 1; i <= n; i++) {
		lua_rawgeti(L, -1, i);
		cout << lua_tostring(L, -1) << endl;
		lua_pop(L, 1);
	}
	lua_close(L); 
	return 0; 
} 

