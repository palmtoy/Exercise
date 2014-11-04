#!/bin/bash

i=0
sum=0

until ((i==11))
do
  let sum+=i
  let ++i
done

echo $sum

