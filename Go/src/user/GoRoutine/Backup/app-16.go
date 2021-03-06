package main

import (
  "fmt"
  "time"
  "runtime"
)

func main() {
  runtime.GOMAXPROCS(runtime.NumCPU())

  c := make(chan bool)

  ball := make(chan bool, 1)
  ball <- false
  
  go Cli(ball)
  go Svr(ball)

  <- c
}

func Cli(ball chan bool) {
  var cnt = 0
  for {
    select {
      case v := <- ball:
        if !v {
          cnt++
          fmt.Println(cnt, " ~ Hello");
          time.Sleep(1 * time.Second)
        }
        ball <- true
    }    
  }
}

func Svr(ball chan bool) {
  var cnt = 0
  for {
    select {
      case v := <- ball:
        if v {
          cnt++;
          fmt.Println(cnt, " ~ World\n");
          time.Sleep(1 * time.Second)
        }
        ball <- false
    }    
  }
}

