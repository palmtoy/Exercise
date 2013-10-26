#include <iostream>
#include <complex> //复数 
#include "lua.hpp"
using namespace std;
//编译命令行: g++ -g myCom.cpp -o myCom /home/lzg/trunk/3rd/lua/lua-5.1.4_coco-1.1.5/src/liblua.a
  
//C函数，做复数计算，输入实部，虚部。输出绝对值和角度 
int calcComplex(lua_State *L) 
{ 
    //从栈中读入实部，虚部 
    double r = luaL_checknumber(L, 1); 
    double i = luaL_checknumber(L, 2); 
    complex<double> c(r, i); 
    //存入绝对值 
    lua_pushnumber(L, abs(c)); 
    //存入角度 
    lua_pushnumber(L, arg(c)*180.0/3.14159); 
    return 2;//两个结果 
} 
  
int main() 
{ 
    char szLua_code[] = "v, a = MyCalcComplex(3,4)\n	print(v,a)\n"; 
  
    lua_State *L = luaL_newstate(); 
    luaL_openlibs(L); 
    
    //放入C函数 
		lua_register(L, "MyCalcComplex", calcComplex); // 该函数为下面两函数的宏
    // lua_pushcfunction(L, calcComplex); 
    // lua_setglobal(L, "MyCalcComplex"); 
    
    //执行 
    bool err = luaL_loadstring(L, szLua_code) || lua_pcall(L, 0, 0, 0); 
    if(err) 
    { 
        cerr << lua_tostring(L, -1) << "\n"; 
        lua_pop(L, 1); 
    } 
  
    lua_close(L); 
    return 0; 
} 

