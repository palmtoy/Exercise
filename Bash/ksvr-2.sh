#!/bin/bash

NODE_PROCESS_NUM=0

until ((NODE_PROCESS_NUM==1))
do
  NODE_PROCESS_NUM=`cat /Users/zgli/MyConfigFiles/.password | sudo -S pkill node; sleep 0.1s; ps aux | grep node -w | wc -l`
done

ps aux | grep node -w

