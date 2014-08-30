function foo() {
  console.log('1: u = ', u);

  if(true) {
    var u = 9;

    console.log('2: v = ', v);
  }

  console.log('3: u = ', u);

  var v = 99;

  // console.log('4: w = ', w);
}


foo();
