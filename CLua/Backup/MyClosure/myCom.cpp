#include <iostream>
#include <complex> //���� 
#include "lua.hpp"
using namespace std;
//����������: g++ -g myCom.cpp -o myCom /home/lzg/trunk/3rd/lua/lua-5.1.4_coco-1.1.5/src/liblua.a
  
//C���������������㣬����ʵ�����鲿���������ֵ�ͽǶ� 
int calcComplex(lua_State *L) 
{ 
    //��ջ�ж���ʵ�����鲿 
    double r = luaL_checknumber(L, 1); 
    double i = luaL_checknumber(L, 2); 
    complex<double> c(r, i); 
    //�������ֵ 
    lua_pushnumber(L, abs(c)); 
    //����Ƕ� 
    lua_pushnumber(L, arg(c)*180.0/3.14159); 
    return 2;//������� 
} 
  
int main() 
{ 
    char szLua_code[] = "v, a = MyCalcComplex(3,4)\n	print(v,a)\n"; 
  
    lua_State *L = luaL_newstate(); 
    luaL_openlibs(L); 
    
    //����C���� 
		lua_register(L, "MyCalcComplex", calcComplex); // �ú���Ϊ�����������ĺ�
    // lua_pushcfunction(L, calcComplex); 
    // lua_setglobal(L, "MyCalcComplex"); 
    
    //ִ�� 
    bool err = luaL_loadstring(L, szLua_code) || lua_pcall(L, 0, 0, 0); 
    if(err) 
    { 
        cerr << lua_tostring(L, -1) << "\n"; 
        lua_pop(L, 1); 
    } 
  
    lua_close(L); 
    return 0; 
} 

