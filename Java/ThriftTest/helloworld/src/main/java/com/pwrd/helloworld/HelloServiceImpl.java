package com.pwrd.helloworld;

import com.pwrd.helloworld.gen.service.demo.Hello;
import org.apache.thrift.TException;

import java.util.Date;

public class HelloServiceImpl implements Hello.Iface {
	@Override
	public boolean helloBoolean(boolean para) throws TException {
		return para;
	}

	@Override
	public int helloInt(int para) throws TException {
		try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		return para+1;
	}

	@Override
	public String helloNull() throws TException {
		return null;
	}

	@Override
	public String helloString(String para) throws TException {
		return new Date() + " ~ Server echo: \'" + para + "\'";
	}

	@Override
	public void helloVoid() throws TException {
		System.out.println(new Date() + " ~ Hello World");
	}
}

