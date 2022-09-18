package com.demo.demo_boot_gradle;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Greeting {
	private String message;

	@Override
	public String toString() {
		return "Greeting{" +
				"message='" + message + '\'' +
				'}';
	}
}
