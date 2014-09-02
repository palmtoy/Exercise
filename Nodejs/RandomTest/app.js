function getRandomNum(number) {
  rnd.today = new Date();

  rnd.seed = rnd.today.getTime();

  function rnd() {
    rnd.seed = (rnd.seed * 9301 + 49297) % 233280;
    return rnd.seed / (233280.0);
  };

  function rand(num) {
    return Math.floor(rnd() * num);
  };

  return rand(number);
}

var v = getRandomNum(10);
console.log('v = ', v);


