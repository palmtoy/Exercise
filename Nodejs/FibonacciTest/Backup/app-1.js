var foo = function(n) 
{
  console.log('n = ', n);    
  return foo(n+1);
}

foo(0);

