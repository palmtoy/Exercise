var value = '\'{"id":"ID_HELLO","params":["1","ID_WORLD_MATK_101"]}\'';

value = value.replace(/^(['==])|([=='])$/gm, "");
console.log('value =', value);

