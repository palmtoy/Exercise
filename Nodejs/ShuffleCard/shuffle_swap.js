function shuffle_swap(m) //洗牌 //换牌法
{
  // 生成m张牌
  var arr = new Array(m);
  for(var i = 0; i < m; i++) {
    arr[i] = i;
  }

  console.log('before shuffle: arr = ', JSON.stringify(arr));

  // 第i张与任意一张牌换位子, 换完一轮即可
  for(var i = 0; i < m; i++) {
    // var rnd = Math.floor(Math.random()*(i+1));
    var rnd = Math.floor(Math.random() * m);
    var tmp = arr[rnd];
    arr[rnd] = arr[i];
    arr[i] = tmp;
  }

  console.log('after shuffle:  arr = ', JSON.stringify(arr));

  return arr;
}

// shuffle_swap(41);
shuffle_swap(10);
