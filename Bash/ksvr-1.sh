#!/bin/bash

P_NUM=0

until ((P_NUM==1))
do
  P_NUM=`cat /Users/zgli/MyConfigFiles/.password | sudo -S pkill node; sleep 0.1s; ps aux | grep node -w | wc -l`
done

ps aux | grep node -w

