package main

import (
  "fmt"
  "time"
)

func main() {
  go func() {
    fmt.Println("hi, baby!!")
  }()
  time.Sleep(2 * time.Second)
}

func Go() {
  fmt.Println("Go Go Go!!")
}
