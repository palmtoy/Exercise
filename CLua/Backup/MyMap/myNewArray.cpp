#include <iostream>
#include <string>
#include <limits>
#include "lua.hpp"
using namespace std;

#define BITS_PER_WORD (CHAR_BIT * sizeof(unsigned int))
#define I_WORD(i) ((unsigned int)(i) / BITS_PER_WORD)
#define I_BIT(i) (1 << ((unsigned int)(i) % BITS_PER_WORD))
#define checkarray(L) (NumArray *)luaL_checkudata(L, 1, "LuaBook.array")

typedef struct NumArray {
	int size;
	unsigned int values[1];
} NumArray;

static int newarray(lua_State *L) {
	int i, n;
	size_t nbytes;
	NumArray *a;

	n = luaL_checkint(L, 1);
	luaL_argcheck(L, n >= 1, 1, "invalide sizee");
	nbytes = sizeof(NumArray) + I_WORD(n-1)*sizeof(unsigned int);
	cout << "nbytes = " << nbytes << endl;
	a = (NumArray *)lua_newuserdata(L, nbytes);

	a->size = n;
	for(i = 0; i <= I_WORD(n-1); i++)
		a->values[i] = 0;

	luaL_getmetatable(L, "LuaBook.array");
	lua_setmetatable(L, -2);
	return 1;
}

static unsigned int *getindex(lua_State *L, unsigned int *mask) {
	NumArray *a = checkarray(L);
	int index = luaL_checkint(L, 2) - 1;
	luaL_argcheck(L, 0 <= index && index < a->size, 2, "index out of range");

	*mask = I_BIT(index);
	return &a->values[I_WORD(index)];
}

static int setarray(lua_State *L) {
	unsigned int mask;
	unsigned int *entry = getindex(L, &mask);
	luaL_checkany(L, 3);
	if(lua_toboolean(L, 3))
		*entry |= mask;
	else
		*entry &= ~mask;
	return 0;
}

static int getarray(lua_State *L) {
	unsigned int mask;
	unsigned int *entry = getindex(L, &mask);
	lua_pushboolean(L, *entry & mask);
	return 1;
}

static int getsize(lua_State *L) {
	NumArray *a = checkarray(L);
	lua_pushinteger(L, a->size);
	return 1;
}

static const struct luaL_Reg arraylib[] = {
	{"new", newarray},
	{"set", setarray},
	{"get", getarray},
	{"size", getsize},
	{NULL, NULL}
};

int luaopen_array(lua_State *L) {
	luaL_newmetatable(L, "LuaBook.array");
	luaL_register(L, "array", arraylib);
	return 1;
}

int main() { 
	lua_State *L = luaL_newstate(); 
	luaL_openlibs(L); 
	luaopen_array(L);
	
	char szLua_code[] = "a = array.new(1000) \n print(a) \n print(array.size(a)) \n for i = 1, 1000 do \n array.set(a, i, i%5 == 0) \n end \n print(array.get(a, 10)) \n print(array.get(a, 11)) \n -- print(array.get(io.stdin, 10)) ";
	bool err = luaL_loadstring(L, szLua_code) || lua_pcall(L, 0, 0, 0); 
	if(err) { 
		cerr << lua_tostring(L, -1); 
		lua_pop(L, 1); 
	} 

	lua_close(L); 
	return 0; 
} 

