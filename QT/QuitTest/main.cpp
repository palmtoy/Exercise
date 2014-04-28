#include <QApplication>
// #include <QtGui/QApplication>
#include <QPushButton>
// #include <QtGui/QPushButton>
#include <QFont>
// #include <QtGui/QFont>

int main(int argc, char **argv)
{
  QApplication a(argc, argv);

  QPushButton quit("Quit", 0);
  quit.resize(175, 30);
  quit.setFont(QFont("Times", 16, QFont::Bold));

  QObject::connect(&quit, SIGNAL(clicked()), &a, SLOT(quit()));

  quit.show();

  return a.exec();
}
