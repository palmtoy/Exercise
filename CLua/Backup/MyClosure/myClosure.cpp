#include <iostream>
#include "lua.hpp"
using namespace std;

//���㺯�� 
int count(lua_State *L) 
{ 
    //�õ�UpValue 
    double m_ = lua_tonumber(L, lua_upvalueindex(1)); 
    //����UpValue 
    lua_pushnumber(L, ++m_); 
    lua_replace(L, lua_upvalueindex(1)); 
    //���ؽ����ֱ�Ӹ���һ��UpValue��Ϊ����� 
    lua_pushvalue(L, lua_upvalueindex(1)); 
    return 1;  
} 
//������������һ�����ֺ�count������������󷵻رհ��� 
int newCount(lua_State *L) 
{ 
    //��������ֵ����UpValue�� 
    lua_pushnumber(L,0); 
    //������㺯�����������������������������ݸ��� 
    lua_pushcclosure(L, count, 1); 
    return 1;//һ�����,�������� 
} 
  
int main() 
{ 
    char szLua_code[] = "c1 = NewCount()\n	c2 = NewCount()\n	for i=1,5 do print(c1()) end\n	print("")\n	for i=1,6 do print(c2()) end"; 
  
    lua_State *L = luaL_newstate(); 
    luaL_openlibs(L); 
    
    //����C���� 
    lua_register(L,"NewCount",newCount); 
    
    //ִ�� 
    bool err = luaL_loadstring(L, szLua_code) || lua_pcall(L, 0, 0, 0); 
    if(err) 
    { 
        cerr << lua_tostring(L, -1); 
        lua_pop(L, 1); 
    } 
  
    lua_close(L); 
    return 0; 
} 

