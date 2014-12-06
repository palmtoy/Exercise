#!/bin/bash

SYSTEM=`uname -s`

if [ $SYSTEM = "Darwin" ] ; then
echo "Mac OS X" 

elif [ $SYSTEM = "Linux" ] ; then
echo "Linux" 

else 
echo "What?" 

fi  #ifend

