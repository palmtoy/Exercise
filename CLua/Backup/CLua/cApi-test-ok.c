#include <stdio.h>
#include <string.h>
#include "/home/lzg/trunk/3rd/lua/lua-5.1.4_coco-1.1.5/src/lua.h"
#include "/home/lzg/trunk/3rd/lua/lua-5.1.4_coco-1.1.5/src/lualib.h"
#include "/home/lzg/trunk/3rd/lua/lua-5.1.4_coco-1.1.5/src/lauxlib.h"
//����������: gcc -g cApi.c -o cApi -lm -DLUA_USE_READLINE /home/lzg/trunk/3rd/lua/lua-5.1.4_coco-1.1.5/src/liblua.a

  
int main() 
{ 
	char buff[256];
	int error;
	lua_State *L = luaL_newstate();    //��ʼ��lua 
	luaL_openlibs(L);    //��������lua��׼�� 

	printf("> ");
	while (fgets(buff, sizeof(buff), stdin) != NULL) {
		error = luaL_loadbuffer(L, buff, strlen(buff), "line") || lua_pcall(L, 0, 0, 0);
		if (error) {
			fprintf(stderr, "%s", lua_tostring(L, -1));
			lua_pop(L, 1);
		}
		printf("> ");
	}

	lua_close(L);//�ر� 
	return 0; 
} 

