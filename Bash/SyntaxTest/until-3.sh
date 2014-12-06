#!/bin/bash

i=0
sum=0

until ((i==11||sum>10))
do
  let sum+=i
  let ++i
done

echo $sum

