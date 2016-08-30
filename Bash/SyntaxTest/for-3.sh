#!/bin/bash

FuncFoo () {
	echo "$# parameters";
	echo "$@";
	echo

	for p in "$@";
	do
		echo "[$p]";
	done
}

FuncFoo 'xyz' '1+2' 9

