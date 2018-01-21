all:
	protoc --cpp_out=. EchoSrv.Staff.proto
	g++ -g -Wall srv.cc EchoSrv.Staff.pb.cc -o srv -lprotobuf
	g++ -g -Wall cli.cc EchoSrv.Staff.pb.cc -o cli -lprotobuf

clean:
	rm -rf srv cli EchoSrv.Staff.pb.cc EchoSrv.Staff.pb.h cli.dSYM srv.dSYM
