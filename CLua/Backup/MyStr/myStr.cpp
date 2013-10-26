#include <iostream>
#include "lua.hpp"
using namespace std;
//编译命令行: g++ -g myStr.cpp -o myStr /home/lzg/trunk/3rd/lua/lua-5.1.4_coco-1.1.5/src/liblua.a

int main() 
{ 
    //Lua示例代码，是一个函数 
    char szLua_code[] = "function gsub(Str, Mode, Tag)\n	a,b = string.gsub(Str, Mode, Tag)\n	c = string.upper(a)\n	return a,b,c --多个返回值\n	end"; 
    //Lua的字符串模式 
    char szMode[] = "(%w+)%s*=%s*(%w+)"; 
    //要处理的字符串 
    char szStr[] = "key1 = value1 key2 = value2"; 
    //目标字符串模式 
    char szTag[] = "<%1>%2</%1>"; 
  
    lua_State *L = luaL_newstate(); 
    luaL_openlibs(L); 
  
    //执行 
    bool err = luaL_loadbuffer(L, szLua_code, strlen(szLua_code), "demo") || lua_pcall(L, 0, 0, 0);
    if(err) 
    { 
        cerr << lua_tostring(L, -1) << "\n"; 
        lua_pop(L, 1); 
    } 
    else 
    { 
        //Lua执行后取得全局变量的值 
        lua_getglobal(L, "gsub"); 
        if(lua_isfunction(L, -1))    //确认一下是个函数 
        { 
            //依次放入三个参数 
            lua_pushstring(L, szStr); 
            lua_pushstring(L, szMode); 
            lua_pushstring(L, szTag); 
            //调用,我们有3个参数，要得到2个结果 
            //你可能注意到gsub函数返回了3个，不过我们只要2个，这没有问题 
            //没有使用错误处理回调，所以lua_pcall最后一个参数是0 
            if(0 != lua_pcall(L, 3, 2, 0)) 
            { 
                //如果错误，显示 
                cerr << lua_tostring(L, -1); 
                lua_pop(L, 1);                 
            } 
            else 
            { 
                //正确，得到两个结果，注意在栈里的顺序 
                cout << "a = " << lua_tostring(L, -2) << endl; 
                cout << "b = " << lua_tostring(L, -1) << endl; 
                //弹出这两个结果 
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

