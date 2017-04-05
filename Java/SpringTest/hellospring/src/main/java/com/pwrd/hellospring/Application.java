package com.pwrd.hellospring;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.*;

import java.util.Date;

@Configuration
@ComponentScan
public class Application {

	@Bean
	MessageService mockMessageService() {
		return new MessageService() {
			public String getMessage() {
				return new Date() + " ~ Hello World with Spring!";
			}
		};
	}

	public static void main(String[] args) {
		ApplicationContext context = 
			new AnnotationConfigApplicationContext(Application.class);
		MessagePrinter printer = context.getBean(MessagePrinter.class);
		printer.printMessage();
	}
}

