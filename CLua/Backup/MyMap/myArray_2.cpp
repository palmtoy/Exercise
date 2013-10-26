#include <iostream>
#include <string>
#include <limits>
#include "lua.hpp"
using namespace std;

#define BITS_PER_WORD (CHAR_BIT * sizeof(unsigned int))
#define I_WORD(i) ((unsigned int)(i) / BITS_PER_WORD)
#define I_BIT(i) (1 << ((unsigned int)(i) % BITS_PER_WORD))

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
	return 1;
}

static int setarray(lua_State *L) {
	NumArray *a = (NumArray *)lua_touserdata(L, 1);
	int index = luaL_checkint(L, 2) - 1;
	luaL_checkany(L, 3);

	luaL_argcheck(L, a != NULL, 1, "'array' expected");
	luaL_argcheck(L, 0 <= index && index < a->size, 2, "index out of range");

	if(lua_toboolean(L, 3))
		a->values[I_WORD(index)] |= I_BIT(index);
	else
		a->values[I_WORD(index)] &= ~I_BIT(index);
	return 0;
}

static int getarray(lua_State *L) {
	NumArray *a = (NumArray *)lua_touserdata(L, 1);
	int index = luaL_checkint(L, 2) - 1;

	luaL_argcheck(L, a != NULL, 1, "'array' expected");
	luaL_argcheck(L, 0 <= index && index < a->size, 2, "index out of range");

	lua_pushboolean(L, a->values[I_WORD(index)] & I_BIT(index));
	return 1;
}

static int getsize(lua_State *L) {
	NumArray *a = (NumArray *)lua_touserdata(L, 1);
	luaL_argcheck(L, a != NULL, 1, "'array' expected");
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
	luaL_register(L, "array", arraylib);
	return 1;
}

int main() { 
	lua_State *L = luaL_newstate(); 
	luaL_openlibs(L); 
	luaopen_array(L);
	
	char szLua_code[] = "a = array.new(1000) \n print(a) \n print(array.size(a)) \n for i = 1, 1000 do \n array.set(a, i, i%5 == 0) \n end \n print(array.get(a, 10)) \n print(array.get(a, 11)) \n ";
	// char szLua_code[] = "a = array.new(1000) \n print(a) \n print(array.size(a)) \n array.set(io.stdin, 1, false) \n end \n print(array.get(a, 10)) \n print(array.get(a, 11)) \n print(array.get(io.stdin, 10)) ";
	bool err = luaL_loadstring(L, szLua_code) || lua_pcall(L, 0, 0, 0); 
	if(err) { 
		cerr << lua_tostring(L, -1); 
		lua_pop(L, 1); 
	} 

	lua_close(L); 
	return 0; 
} 

