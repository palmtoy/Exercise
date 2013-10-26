#include <iostream>
#include "lua.hpp"
using namespace std;
//����������: g++ -g myStr.cpp -o myStr /home/lzg/trunk/3rd/lua/lua-5.1.4_coco-1.1.5/src/liblua.a

int main() 
{ 
    //Luaʾ�����룬��һ������ 
    char szLua_code[] = "function gsub(Str, Mode, Tag)\n	a,b = string.gsub(Str, Mode, Tag)\n	c = string.upper(a)\n	return a,b,c --�������ֵ\n	end"; 
    //Lua���ַ���ģʽ 
    char szMode[] = "(%w+)%s*=%s*(%w+)"; 
    //Ҫ������ַ��� 
    char szStr[] = "key1 = value1 key2 = value2"; 
    //Ŀ���ַ���ģʽ 
    char szTag[] = "<%1>%2</%1>"; 
  
    lua_State *L = luaL_newstate(); 
    luaL_openlibs(L); 
  
    //ִ�� 
    bool err = luaL_loadbuffer(L, szLua_code, strlen(szLua_code), "demo") || lua_pcall(L, 0, 0, 0);
    if(err) 
    { 
        cerr << lua_tostring(L, -1) << "\n"; 
        lua_pop(L, 1); 
    } 
    else 
    { 
        //Luaִ�к�ȡ��ȫ�ֱ�����ֵ 
        lua_getglobal(L, "gsub"); 
        if(lua_isfunction(L, -1))    //ȷ��һ���Ǹ����� 
        { 
            //���η����������� 
            lua_pushstring(L, szStr); 
            lua_pushstring(L, szMode); 
            lua_pushstring(L, szTag); 
            //����,������3��������Ҫ�õ�2����� 
            //�����ע�⵽gsub����������3������������ֻҪ2������û������ 
            //û��ʹ�ô�����ص�������lua_pcall���һ��������0 
            if(0 != lua_pcall(L, 3, 2, 0)) 
            { 
                //���������ʾ 
                cerr << lua_tostring(L, -1); 
                lua_pop(L, 1);                 
            } 
            else 
            { 
                //��ȷ���õ����������ע����ջ���˳�� 
                cout << "a = " << lua_tostring(L, -2) << endl; 
                cout << "b = " << lua_tostring(L, -1) << endl; 
                //������������� 
                lua_pop(L, 2); 
            } 
        } 
        else 
        { 
            lua_pop(L,1); 
        } 
    } 
    lua_close(L); 
    return 0; 
} 

