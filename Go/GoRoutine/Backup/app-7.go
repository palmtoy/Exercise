package main

import (
  "fmt"
  "runtime"
)

func main() {
  var iCpuNum = runtime.NumCPU()
  fmt.Println(iCpuNum, "\n")
  runtime.GOMAXPROCS(runtime.NumCPU())
  c := make(chan bool)
  for i := 0; i < 10; i++ {
    go Go(c, i)
  }
  <- c
}

func Go(c chan bool, index int) {
  a := 0
  for i := 0; i <= 100000000; i++ {
    a += i
  }
  fmt.Println(index, a)
  
  if index == 9 {
    c <- true
  }
}


