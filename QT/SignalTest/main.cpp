#include <QApplication>

#include "newspaper.h"
#include "reader.h"

int main(int argc, char *argv[])
{
  QApplication app(argc, argv);

  Newspaper newspaper("Newspaper: China Daily");
  Reader reader;

  QObject::connect(&newspaper, SIGNAL(deliverPaper(QString)), &reader, SLOT(receiveNewspaper(QString)));

  newspaper.send();

  return app.exec();
}
