#!/bin/sh

PARAM_NUM=4
if [ $# -ne $PARAM_NUM ]
then
	echo "Please input $PARAM_NUM parameters...";
	exit
fi

MAIN_CLASS_NAME="$3"

javac "$1".java
javac "$2".java
javac "$MAIN_CLASS_NAME".java

touch Manifest.txt
echo "Main-Class: $MAIN_CLASS_NAME" > Manifest.txt

jar cfm "$MAIN_CLASS_NAME".jar Manifest.txt "$1".class "$2".class "$MAIN_CLASS_NAME".class

cp jar-template "$4"
cat "$MAIN_CLASS_NAME".jar >> "$4"
chmod +x "$4"

rm "$1".class
rm "$2".class
rm "$MAIN_CLASS_NAME".class
rm "$MAIN_CLASS_NAME".jar
rm Manifest.txt
echo "Done."

# Use the following cmd to gen executable jar file:

# ./gen.sh UpdateMessageDigestInputStream DigestUtils ConvertDevId2Num ConvertDevIdToNum

# (1)  The third param: ConvertDevId2Num is the MAIN_CLASS_NAME
# (2) The fourth param: ConvertDevIdToNum is the executable jar file name

