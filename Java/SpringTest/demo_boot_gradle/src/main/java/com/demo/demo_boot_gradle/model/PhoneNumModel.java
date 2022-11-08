package com.demo.demo_boot_gradle.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PhoneNumModel {
    private int phoneType;
    private String phoneNum;
}


