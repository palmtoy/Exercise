#include <QObject>
#include <QDebug>

class Reader: public QObject
{
  Q_OBJECT
  public:
    Reader() {}

    public slots:
      void receiveNewspaper(const QString & name) const
      {
        qDebug() << "I receive a newspaper: " << name;
      }
};
