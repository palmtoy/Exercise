// !!! Qt 5

/*
   add this to the head of *.pro:

   QT       += core gui
   greaterThan(QT_MAJOR_VERSION, 4): QT += widgets
   */


#include <QApplication>
#include <QPushButton>
#include <QDebug>

int main(int argc, char *argv[])
{
  QApplication app(argc, argv);

  QPushButton button("Quit");
  QObject::connect(&button, &QPushButton::clicked, [](bool) {
      qDebug() << "You clicked me!";
      });
  button.show();

  return app.exec();
}
