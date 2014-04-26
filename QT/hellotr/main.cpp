#include <QApplication>
#include <QPushButton>

int main(int argc, char *argv[])
{
    QApplication app(argc, argv);

    QPushButton hello(QPushButton::tr("Hello world!"));

    hello.resize(150, 30);

    hello.show();
    return app.exec();
}
