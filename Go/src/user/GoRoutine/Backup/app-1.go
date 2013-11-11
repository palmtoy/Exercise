package main

import (
  "fmt"
  "time"
)

func main() {
  go Go()
  time.Sleep(2 * time.Second)
}

func Go() {
  fmt.Println("Go Go Go!!")
}
