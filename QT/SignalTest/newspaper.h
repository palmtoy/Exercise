#include <QObject>

class Newspaper: public QObject
{
  Q_OBJECT
  public:
    Newspaper(const QString & name):
      m_name(name)
    {
    }

    void send() const
    {

      emit deliverPaper(m_name);
    }

  signals:
    void deliverPaper(const QString &name) const;

  private:
    QString m_name;
};
