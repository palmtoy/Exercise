#!/bin/bash

SYSTEM=`uname -s`

case "$SYSTEM" in
	"Darwin")
		echo "Mac OS X" 
		;;
	"Linux" | "Unix")
		echo "Linux/Unix" 
		;;
	*)
		echo "What?" 
		;;
esac

