First, install ZMQ ... (http://zeromq.org/area:download)

wget http://download.zeromq.org/zeromq-3.2.3.tar.gz
tar -zxvf zeromq-3.2.3.tar.gz
cd zeromq-3.2.3
./configure
make
sudo make install
 

Second, add "/usr/local/lib" to a line in ld.so.conf:

$ sudo vi /etc/ld.so.conf
Rerun ldconfig:

$ sudo ldconfig
