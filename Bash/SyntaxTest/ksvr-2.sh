#!/bin/bash

NODE_PROCESS_NUM=0
MY_PWD=`cat ~/MyConfigFiles/.password`

until ((NODE_PROCESS_NUM==1))
do
  NODE_PROCESS_NUM=`echo $MY_PWD | sudo -S pkill node; sleep 0.2s; ps aux | grep node -w | wc -l`
done

ps aux | grep node -w

