const maxCallback = ( acc, cur ) => Math.max( acc.x, cur.x );
const maxCallback2 = ( max, cur ) => Math.max( max, cur );

// reduce() without initialValue
const val1 = [ { x: 22 }, { x: 62 } ].reduce( maxCallback ); // 62
console.log(`val1 = ${val1}`);

const val2 = [ { x: 22 }            ].reduce( maxCallback ); // { x: 22 }
console.log(`val2 = ${JSON.stringify(val2)}`);
// [                      ].reduce( maxCallback ); // TypeError

// map/reduce; better solution, also works for empty or larger arrays
const val3 = [ { x: 22 }, { x: 62 } ].map( el => el.x ).reduce( maxCallback2, -Infinity );
console.log(`val3 = ${val3}`);

