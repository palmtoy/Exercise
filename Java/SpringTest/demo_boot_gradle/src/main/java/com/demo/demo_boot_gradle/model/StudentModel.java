package com.demo.demo_boot_gradle.model;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentModel {
    private int id;
    private String firstName;
	private String lastName;
	private String email;
    private List<PhoneNumModel> phoneNumList;
}
