package com.klef.back;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class NewBackAppApplication extends SpringBootServletInitializer{

	public static void main(String[] args) {
		SpringApplication.run(NewBackAppApplication.class, args);
		System.out.println("Project is running successfully............");
	}

}
