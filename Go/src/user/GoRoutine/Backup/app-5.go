package main

import (
  "fmt"
)

func main() {
  c := make(chan bool)
  go func() {
    fmt.Println("Go Go Go!!")
      <- c
  }()
  c <- true // no cache, block
  close(c)
}

