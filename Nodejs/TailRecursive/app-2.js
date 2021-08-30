const sleep = async ms => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

async function fnAdd(next, sum = 0) {
  if (next <= 0) {
    return sum;
  }
  sum += next;
  if (sum % 100 === 0) {
    console.log(new Error());
    console.log();
  }
  // method ~ 1
  await sleep(1);
  return await fnAdd(next - 1, sum);

  /*
  // method ~ 2
  return new Promise(resolve => {
    setTimeout(async () => {
      resolve(await fnAdd(next - 1, sum));
    }, 1);
  });
  */
}

(async () => {
  const target = 5695;
  const sum = await fnAdd(target);
  console.log(`sum = ${sum}`);

  let vv = 0;
  for(let i = 1; i <= target; i++) {
    vv += i;
  }
  console.log(` vv = ${vv}`);
})();
