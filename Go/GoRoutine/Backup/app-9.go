package main

import (
  "fmt"
  "runtime"
  "sync"
)

var gocNum = 0

func main() {
  runtime.GOMAXPROCS(runtime.NumCPU())
  wg := sync.WaitGroup{}
  wg.Add(10)
  for i := 0; i < 10; i++ {
    go Go(&wg, i)
  }

  wg.Wait()
  fmt.Println("\ngocNum = ", gocNum)
}

func Go(wg *sync.WaitGroup, index int) {
  a := 0
  for i := 0; i <= 100000000; i++ {
    a += i
  }
  fmt.Println(index, a)

  gocNum++;
  wg.Done()
}


