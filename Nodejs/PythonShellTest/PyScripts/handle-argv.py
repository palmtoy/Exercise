# -*- coding: UTF-8 -*-

import sys
from calc import CCalc

def main():
    print("sys.argv[1] =", int(sys.argv[1]))
    print("sys.argv[2] =", int(sys.argv[2]))
    print()

    x = int(sys.argv[1]);
    y = int(sys.argv[2]);

    calcObj = CCalc("calculator.");

    print("sys.argv[1] + sys.argv[2] =", calcObj.add(x, y))


if __name__ == "__main__":
    main()


# python3 prt-argv.py 3 6

