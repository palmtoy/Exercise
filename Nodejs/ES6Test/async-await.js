function resolveAfter2Seconds(x) { 
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  });
}

async function f1() {
  var x = await resolveAfter2Seconds(2019);
  console.log(Date() + " ~ " + x); // 2019
}

f1();

//////////////////////////////////////////

async function f2() {
  var y = await 100;
  console.log(Date() + " ~ " + y); // 100
}

f2();

//////////////////////////////////////////

async function f3() {
  try {
    var z = await Promise.reject(200);
  } catch(e) {
    console.log(Date() + " ~ " + e); // 200
  }
}

f3();

//////////////////////////////////////////

console.log(Date() + " ~ Go...");

