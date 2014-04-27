#include <QCoreApplication>

#include "newspaper.h"
#include "reader.h"

int main(int argc, char *argv[])
{
  QCoreApplication app(argc, argv);

  Newspaper newspaper("Newspaper A");
  Reader reader;
  QObject::connect(&newspaper, SIGNAL(newPaper(QString)),
      &reader,    SLOT(receiveNewspaper(QString)));
  newspaper.send();

  return app.exec();
}
