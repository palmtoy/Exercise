function rain() {
  var x = 1;

  function man() {
    x = 100;
  }

  man();        //调用man

  console.log('x = ', x);    //这里会弹出 100
}

rain();    //调用rain


/*
Output:

x =  100
*/

