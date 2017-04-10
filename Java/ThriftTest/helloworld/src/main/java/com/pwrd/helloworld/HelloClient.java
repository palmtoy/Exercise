package com.pwrd.helloworld;

import com.pwrd.helloworld.gen.service.demo.Hello;
import org.apache.thrift.TException;
import org.apache.thrift.protocol.TBinaryProtocol;
import org.apache.thrift.protocol.TProtocol;
import org.apache.thrift.transport.TSocket;
import org.apache.thrift.transport.TTransport;
import org.apache.thrift.transport.TTransportException;


public class HelloClient {
	private void startClient() {
		TTransport transport;
		try {
			int iPort = 8989;
			transport = new TSocket("localhost", iPort);
			TProtocol protocol = new TBinaryProtocol(transport);
			Hello.Client hCliObj = new Hello.Client(protocol);
			transport.open();
			int param = 888;
			System.out.println("param = " + param + "\nparam + 1 = " + hCliObj.helloInt(param));
			transport.close();
		} catch (TTransportException e) {
			e.printStackTrace();
		} catch (TException e) {
			e.printStackTrace();
		}
	}

	public static void main(String[] args) {
		HelloClient hCli = new HelloClient();
		hCli.startClient();
	}
}

