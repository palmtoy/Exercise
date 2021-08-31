// 计算 ( 1 ~ N ) 的累加值 ( 尾递归 )

let sum = 0;

function fn(x) {
  if (x < 0) return x;
  sum += x;
  return fn.bind(null, x - 1);
}

function trampoline(f) {
  while (f && f instanceof Function) {
    f = f();
  }
  return f;
}

console.log(new Date().toString());

// trampoline(fn(100000000));
// trampoline(fn(100));
trampoline(fn(10));

console.log(new Date().toString(), `~ sum = ${sum}`);
