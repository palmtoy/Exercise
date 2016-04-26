#!/bin/bash

SYSTEM=`uname -s`

case "$SYSTEM" in
	*"arwi"*) # Darwin
		echo "Mac OS X" 
		;;
	*"inu"* | *"ni"*) # Linux/Unix
		echo "Linux/Unix" 
		;;
	*)
		echo "What?" 
		;;
esac

