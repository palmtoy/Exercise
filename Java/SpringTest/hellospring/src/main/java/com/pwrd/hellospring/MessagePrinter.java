package com.pwrd.hellospring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Scope("prototype")
public class MessagePrinter {

	final private MessageService myService;

	@Autowired
	public MessagePrinter(@Qualifier("msgService") MessageService tmpService) {
		this.myService = tmpService;
	}

	public void printMessage() {
		System.out.println("Printer -> " + this.myService.getMessage());
	}
}

