var global = this;

var sillyFunction = function (recursed) {
  if (!recursed) { return arguments.callee(true); }
  if (this !== global) {
    console.log("This is: " + this);
  } else {
    console.log("This is the global");
  }
}

sillyFunction();

