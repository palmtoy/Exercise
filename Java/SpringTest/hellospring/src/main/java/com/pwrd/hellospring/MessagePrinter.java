package com.pwrd.hellospring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MessagePrinter {

	final private MessageService myService;

	@Autowired
	public MessagePrinter(MessageService tmpService) {
		this.myService = tmpService;
	}

	public void printMessage() {
		System.out.println(this.myService.getMessage());
	}
}

