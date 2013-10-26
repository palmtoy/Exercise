#include <iostream>
#include <string>
#include "lua.hpp"
using namespace std;


int t_tuple(lua_State *L) {
	int op = luaL_optint(L, 1, 0);
	cout << "op = " << op << endl;  
	if(op == 0) {
		int i;
		for(i = 1; !lua_isnone(L, lua_upvalueindex(i)); i++)
			lua_pushvalue(L, lua_upvalueindex(i));
		return i - 1;
	}
	else {
		luaL_argcheck(L, op > 0, 1, "index out of rangee");
		if(lua_isnone(L, lua_upvalueindex(op)))
			return 0;
		lua_pushvalue(L, lua_upvalueindex(op));
		return 1;
	}
}

int t_new(lua_State *L) {
	// cout << "lua_gettop(L) = " << lua_gettop(L) << endl;
	lua_pushcclosure(L, t_tuple, lua_gettop(L));
	return 1;
}

static const struct luaL_Reg tuplelib[] = {
	{"new", t_new},
	{NULL, NULL}
};

int luaopen_tuple(lua_State *L) {
	luaL_register(L, "tuple", tuplelib);
	return 1;
}

int main()
{ 
	lua_State *L = luaL_newstate(); 
	luaL_openlibs(L); 
	luaopen_tuple(L);
	
	char szLua_code[] = "x = tuple.new(10, \"hi\", {}, 3.14) \n print(x(1)) \n print(x(2)) \n print(x(3)) \n print(x(4)) \n print(x())"; 
	bool err = luaL_loadstring(L, szLua_code) || lua_pcall(L, 0, 0, 0); 
	if(err) { 
		cerr << lua_tostring(L, -1); 
		lua_pop(L, 1); 
	} 

	lua_close(L); 
	return 0; 
} 

