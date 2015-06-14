#!/bin/bash

function foo {
	echo 'In foo'
	echo ''
	echo ${BASH_SOURCE[0]} + ${FUNCNAME[0]}
	echo ${BASH_SOURCE[1]} + ${FUNCNAME[1]}
}

echo 'in bash_source_test.sh'
echo ''
echo ${BASH_SOURCE[0]} + ${FUNCNAME[0]}
echo ''

foo


# output(put multiple line comment):
: '
$./bash_source_test.sh
in bash_source_test.sh

./bash_source_test.sh +

In foo

./bash_source_test.sh + foo
./bash_source_test.sh + main
'
