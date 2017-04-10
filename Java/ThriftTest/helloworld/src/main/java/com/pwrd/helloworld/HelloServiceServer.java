package com.pwrd.helloworld;

import com.pwrd.helloworld.gen.service.demo.Hello;
import org.apache.thrift.protocol.TBinaryProtocol;
import org.apache.thrift.protocol.TBinaryProtocol.Factory;
import org.apache.thrift.server.TServer;
import org.apache.thrift.server.TThreadPoolServer;
import org.apache.thrift.server.TThreadPoolServer.Args;
import org.apache.thrift.transport.TServerSocket;
import org.apache.thrift.transport.TTransportException;


public class HelloServiceServer {
	private int iPort = 8989;
	private void startServer() {
		try {
			TServerSocket serverTransport = new TServerSocket(iPort);

			Hello.Processor process = new Hello.Processor(new HelloServiceImpl());
			Factory portFactory = new TBinaryProtocol.Factory(true, true);
			Args args = new Args(serverTransport);
			args.processor(process);
			args.protocolFactory(portFactory);

			TServer tServerObj = new TThreadPoolServer(args);
			tServerObj.serve();
		} catch (TTransportException e) {
			e.printStackTrace();
		}
	}

	public static void main(String[] args) {
		HelloServiceServer hServerObj = new HelloServiceServer();
		System.out.println("Server is running on " + hServerObj.iPort + " ...");
		hServerObj.startServer();
	}
}

