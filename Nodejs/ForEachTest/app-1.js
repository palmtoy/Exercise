var o = {1: 'a', 2: 'b', 3: 'c'};

Object.keys(o).forEach(function(e, k) {
  console.log('k, e, v = ', k, e, o[e]);
})
