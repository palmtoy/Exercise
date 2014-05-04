// !!! Qt 5

/*
   add this to the head of *.pro:

   QT       += core gui
   greaterThan(QT_MAJOR_VERSION, 4): QT += widgets
   */

////////// main.cpp
#include <QCoreApplication>

#include "newspaper.h"
#include "reader.h"

int main(int argc, char *argv[])
{
  QCoreApplication app(argc, argv);

  Newspaper newspaper("Newspaper~ China Daily ...");
  Reader reader;

  QObject::connect(&newspaper, &Newspaper::newPaper, &reader, &Reader::receiveNewspaper);

  newspaper.send();

  return app.exec();
}

