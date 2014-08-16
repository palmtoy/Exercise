#!/usr/bin/python
#filename: app.py
#author: XYT

import random

def getRndData(sampleL, n, retL):
  if len(sampleL) < n:
    return
  for i in range(1, n+1):
    rnd = random.choice(sampleL)
    retL.append(rnd)
    sampleL.remove(rnd)

if __name__ == "__main__":
  sampleL = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  retL = []
  getRndData(sampleL, 5, retL)
  print retL

  sampleL = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
  retL = []
  getRndData(sampleL, 6, retL)
  print retL
 
