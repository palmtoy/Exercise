#!/bin/sh

tmp=/tmp/$$.jar

lines=`awk '/^__JAR_FOLLOW__/ {print NR + 1; exit 0; }' $0`
tail -n+$lines $0 > $tmp
java -version > /dev/null 2>&1

if [ $? -ne 0 ]; then
  echo "No java found, please install java first ..."
  exit 255
fi

java -jar $tmp $* 
ret=$?
rm $tmp
exit $ret 

__JAR_FOLLOW__
PK   Z~�D            	  META-INF/��   PK           PK   Z~�D               META-INF/MANIFEST.MF�M��LK-.�K-*��ϳR0�3��r.JM,IM�u�	��ě�*h8�*x�%�i�r�&f��:�$[)x�������r�r PKJ
�T   T   PK   �}�D               HelloWorld.classmPMK1}i�Mw]mmm�,�a�`�kŋ �V��)mCI�nʺ+��҃��?J��B��$�ޛ�7����p���2�.jج�-�&G��|�b��3��;��L$Cu�by�E#�܊�&ĉ��Z��`&�DO�x��D�Ӿ-�B�%cy���z%�6�&ѓ���Q�����]j�ӝ��v�;C���,8�|�〚-�j�y7�����p�ʈ워��9ezCr��?)�>Cc���6ӴV3X��(���S �;Pt)k���.���Ѓ,S,砕����楀��B��g)�����!d=���PKm�*  �  PK    Z~�D           	                META-INF/��  PK    Z~�DJ
�T   T                =   META-INF/MANIFEST.MFPK    �}�Dm�*  �               �   HelloWorld.classPK      �   ;    