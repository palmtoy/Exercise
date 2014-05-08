#!/bin/sh

#
# example:
#   ./maker.sh   
# 

dir=
path="`pwd`/.."
if [ -n $1 ]; then
  dir=`pwd`
  dir=${dir##*/}
else 
  dir=$1
fi

file=
if [ -n $2 ]; then
  file=`pwd`/../sh-ins.sh
else
  file=$2
fi

echo "#!/bin/sh" > $file
echo "echo" >> $file
echo "echo extracting..." >> $file
echo "echo " >> $file 
echo "" >> $file
echo "dest=" >> $file
echo "if [ ! -n \$1 ]; then" >> $file
echo "  dest=\$1" >> $file
echo "else" >> $file
echo "  dest=\`pwd\`" >> $file
echo "fi" >> $file
echo "" >> $file
echo "lines=\`awk '/^__TAR_BELOW__/ {print NR + 1; exit 0; }' \$0\`" >> $file
echo "tail -n+\$lines \$0 | tar -xz -C \$dest  " >> $file
echo "" >> $file
echo "exit 0" >> $file
echo "" >> $file
echo "__TAR_BELOW__" >> $file

tar -cz --exclude=.* -C $path $dir >> $file
