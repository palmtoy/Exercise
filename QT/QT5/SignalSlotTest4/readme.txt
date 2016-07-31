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

3) make mocables
PS:
After this, you need to `#include "foo.moc"` at the end of foo.cpp to make sure the linker doesn't complain about missing vtables.

4) make mocables all
5) open foo.app
6) cp foo.app /Applications

