#!/usr/bin/env /usr/bin/python

import sys
import tm1637

if __name__ == '__main__':
    showNumList = []

    if len(sys.argv) > 1:
        for i in range(2, len(sys.argv)):
            showNumList.append(int(sys.argv[i]))
        # CLK -> GPIO23 (Pin 16);  Di0 -> GPIO24 (Pin 18)
        tmObj = tm1637.TM1637(23, 24, tm1637.BRIGHT_TYPICAL)
        tmObj.Clear()
        tmObj.SetBrightnes(1)
        tmObj.Show(showNumList)
        tmObj.ShowDoublepoint(int(sys.argv[1]))

# ./show-param.py 1 0 6 0 5

