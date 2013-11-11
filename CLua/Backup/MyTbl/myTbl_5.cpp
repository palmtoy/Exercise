#include <iostream>
#include <string>
#include "lua.hpp"
using namespace std;
//����������: g++ -g myTbl.cpp -o myTbl /home/lzg/trunk/3rd/lua/lua-5.1.4_coco-1.1.5/src/liblua.a

int main() 
{ 
    //Luaʾ�����룬ʹ��table 
    char szLua_code[] = "x = {} --���ڴ�Ž����table\n	x[1],x[2] = string.gsub(c.Str, c.Mode, c.Tag) --x[1]���ǽ����x[2]�����滻����\n	x.u = string.upper(x[1])\n print(\"c[9] = \", c[9])"; 
    //Lua���ַ���ģʽ 
    char szMode[] = "(%w+)%s*=%s*(%w+)"; 
    //Ҫ�������ַ��� 
    char szStr[] = "key1 = value1 key2 = value2"; 
    //Ŀ���ַ���ģʽ 
    char szTag[] = "<%1>%2</%1>"; 
  
    lua_State *L = luaL_newstate(); 
    luaL_openlibs(L); 
  
    //��һ��tabele�͸�Lua 
    lua_newtable(L);    //�½�һ��table��ѹ��ջ�� 
		
    lua_pushstring(L, szMode); //��2���������Դ��������3������
		lua_setfield(L, -2, "Mode"); //��2���������Դ��������3������
    //lua_pushstring(L, "Mode");// key 
    //lua_pushstring(L, szMode);// value 
    //����newtable[Mode]=szMode 
    //������������ѹջ������tableԪ������ջ��������������λ�� 
    //lua_settable(L, -3); 
    //lua_settable���Լ���������ѹ���key��value 
  
    lua_pushstring(L, szTag); //��2���������Դ��������3������
		lua_setfield(L, -2, "Tag"); //��2���������Դ��������3������
    // lua_pushstring(L, "Tag");// key 
    // lua_pushstring(L, szTag);// value 
    // lua_settable(L, -3);    //����newtable[Tag]=szTag 
  
    lua_pushstring(L, szStr); //��2���������Դ��������3������
		lua_setfield(L, -2, "Str"); //��2���������Դ��������3������
    // lua_pushstring(L, "Str");// key 
    // lua_pushstring(L, szStr);// value 
    // lua_settable(L, -3);    //����newtable[Str]=szStr 

    lua_pushstring(L, "Hello world ! -- index : 9");
		lua_rawseti(L, -2, 9);
  
    lua_setglobal(L, "c"); //��ջ��Ԫ�أ�newtable����ΪLua�е�ȫ�ֱ���c 
  
    //ִ�� 
    bool err = luaL_loadbuffer(L, szLua_code, strlen(szLua_code), "demo") || lua_pcall(L, 0, 0, 0); 
    if(err) 
    { 
        //���������ʾ 
        cerr << lua_tostring(L, -1) << endl; 
        //����ջ�������������Ϣ 
        lua_pop(L, 1); 
    } 
    else 
    { 
        //Luaִ�к�ȡ��ȫ�ֱ�����ֵ 
        lua_getglobal(L, "x"); 
  
        //���xӦ���Ǹ�table 
        if(lua_istable(L, -1)) 
        { 
						lua_getfield(L, -1, "u"); // �ú������Դ��������2������
            //ȡ��x.u,��x["u"] 
            // lua_pushstring(L, "u");    //key 
            //�������ѹջ��x����ջ���ڶ�λ�� 
            // lua_gettable(L, -2); 
            //lua_gettable�ᵯ������ѹ���key��Ȼ��Ѷ�Ӧ��valueѹ��ջ�� 
            //ȡ�����ݣ�Ȼ���ջ�е������value 
            cout << "x.u = " << lua_tostring(L, -1) << endl; 
            lua_pop(L, 1); 
             
            //ȡ��x[1]��x[2] 
            for(int i = 1; i <= 2; i++) 
            { 
                //����key�������⣬�������ûʲô���� 
								lua_rawgeti(L, -1, i); // �ú������Դ��������2������
                // lua_pushnumber(L, i); 
                // lua_gettable(L, -2); 
                cout << "x[" << i <<"] = " << lua_tostring(L, -1) << endl; 
                lua_pop(L, 1); 
            } 
        } 
  
        //����ջ����x 
        lua_pop(L, 1); 
    } 
    lua_close(L); 
    return 0; 
} 
