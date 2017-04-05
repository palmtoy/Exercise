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
		ApplicationContext appContext =
			new AnnotationConfigApplicationContext(Application.class);
		MessagePrinter msgPrinter = appContext.getBean(MessagePrinter.class);
		msgPrinter.printMessage();
	}
}

