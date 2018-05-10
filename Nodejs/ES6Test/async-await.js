function resolveAfter2Seconds(x) { 
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  });
}

async function f1() {
  var x = await resolveAfter2Seconds(2000);
  console.log(Date.now() + " ~ " + x); // 2000
}

f1();

//////////////////////////////////////////

async function f2() {
  var y = await 100;
  console.log(Date.now() + " ~ " + y); // 100
}

f2();

//////////////////////////////////////////

async function f3() {
  try {
    var z = await Promise.reject(200);
  } catch(e) {
    console.log(Date.now() + " ~ " + e); // 200
  }
}

f3();

//////////////////////////////////////////

console.log(Date.now() + " ~ Go...");

