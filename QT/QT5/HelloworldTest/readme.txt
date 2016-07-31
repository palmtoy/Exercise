1) qmake -project -o foo.pro
PS:
Edit foo.pro after creating it. Add the line 'QT += widgets' to be able to compile:
```
TEMPLATE = app
TARGET = foo
INCLUDEPATH += .
QT += widgets # <== Add this

# Input
SOURCES += foo.cpp
```

2) qmake -makefile
3) make
4) open foo.app
5) cp foo.app /Applications

