def foo(n):
  print n
  return foo(n+1)

if __name__ == "__main__":
  foo(0)

