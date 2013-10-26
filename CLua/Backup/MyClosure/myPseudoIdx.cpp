#include <iostream>
#include "lua.hpp"
using namespace std;

int main() 
{ 
    char szLua_code[] = "a=10\n	b=\"hello\"\n	c=true"; 
  
    lua_State *L = luaL_newstate(); 
    luaL_openlibs(L); 
    
    //ִ�� 
    bool err = luaL_loadstring(L, szLua_code) || lua_pcall(L, 0, 0, 0); 
    if(err) 
    { 
        cerr << lua_tostring(L, -1) << endl; 
        lua_pop(L, 1); 
    } 
    else 
    { 
        //����LUA_GLOBALSINDEX���ڵ�table�õ� 
        lua_pushnil(L); 
        while(0 != lua_next(L, LUA_GLOBALSINDEX)) 
        { 
            // 'key' �������� -2 ���� �� 'value' �������� -1 ���� 
            /* 
            �ڱ���һ�ű��ʱ�򣬲�Ҫֱ�Ӷ� key ���� lua_tolstring �� 
            ������֪����� key һ����һ���ַ����� 
            ���� lua_tolstring �п��ܸı��������λ�õ�ֵ�� 
            ������һ�ε��� lua_next ���Ӱ�졣 
            ���Ը���һ��key��ջ���� 
            */ 
            lua_pushvalue(L, -2); 
            printf("%s - %s \n", lua_tostring(L, -1),    //key,�ղŸ��Ƶ� 
                  lua_typename(L, lua_type(L,-2))); //value����������-2��λ���� 
            // �Ƴ� 'value' �͸��Ƶ�key������Դ 'key' ����һ�ε��� 
            lua_pop(L, 2); 
        } 
    } 
    lua_close(L); 
    return 0; 
} 

