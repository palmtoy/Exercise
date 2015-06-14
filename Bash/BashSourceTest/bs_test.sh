#!/bin/bash

TMP_PATH="$( dirname "${BASH_SOURCE[0]}" )"
echo 'TMP_PATH =' $TMP_PATH
echo ''

function foo {
	echo 'In foo'
	echo ''
	echo ${BASH_SOURCE[0]} + ${FUNCNAME[0]}
	echo ${BASH_SOURCE[1]} + ${FUNCNAME[1]}
}

echo 'in bs_test.sh'
echo ''
echo ${BASH_SOURCE[0]} + ${FUNCNAME[0]}
echo ''

foo


# output(put multiple line comment):
: '
~/Exercise/Bash$ ./Misc/bs_test.sh
TMP_PATH = ./Misc

in bs_test.sh

./Misc/bs_test.sh +

In foo

./Misc/bs_test.sh + foo
./Misc/bs_test.sh + main
'

