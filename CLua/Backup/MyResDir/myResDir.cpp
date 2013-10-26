#include <iostream>
#include <dirent.h>
#include <errno.h>
#include "lua.hpp"
using namespace std;

static int dir_iter(lua_State *L);

static int l_dir(lua_State *L) {
	const char *path = luaL_checkstring(L, 1);
	DIR **d = (DIR **)lua_newuserdata(L, sizeof(DIR*));

	luaL_getmetatable(L, "LuaBook.dir");
	lua_setmetatable(L, -2); // 将名为LuaBook.dir的表设置为 userdata 的元表

	*d = opendir(path);
	if(*d == NULL)
		luaL_error(L, "cannot open %s: %s", path, strerror(errno));

	lua_pushcclosure(L, dir_iter, 1);
	return 1;
}

static int dir_iter(lua_State *L) {
	DIR *d = *(DIR **)lua_touserdata(L, lua_upvalueindex(1));
	struct dirent *entry;
	if((entry = readdir(d)) != NULL) {
		lua_pushstring(L, entry->d_name);
		return 1;
	}
	else return 0;
}

static int dir_gc(lua_State *L) {
	DIR *d = *(DIR **)lua_touserdata(L, 1);
	if(d) closedir(d);
	return 0;
}

int luaopen_dir(lua_State *L) {
	luaL_newmetatable(L, "LuaBook.dir");

	lua_pushstring(L, "__gc");
	lua_pushcfunction(L, dir_gc);
	lua_settable(L, -3);

	lua_pushcfunction(L, l_dir);
	lua_setglobal(L, "dir");

	return 0;
}

int main() { 
	lua_State *L = luaL_newstate(); 
	luaL_openlibs(L); 
	luaopen_dir(L);
	
	// char szLua_code[] = "cl = dir(\".\") \n local DirName = nil \n DirName = cl() \n while(DirName) do \n print(DirName) \n DirName = cl() \n end \n ";
	char szLua_code[] = "for fname in dir(\".\") do print(fname) end";
	bool err = luaL_loadstring(L, szLua_code) || lua_pcall(L, 0, 0, 0); 
	if(err) { 
		cerr << lua_tostring(L, -1); 
		lua_pop(L, 1); 
	} 

	lua_close(L); 
	return 0; 
} 

