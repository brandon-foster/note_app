package com.joyldp.note;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import lombok.extern.log4j.Log4j2;

@Log4j2
@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        ApplicationContext context = SpringApplication.run(Application.class, args);
        String personName = context.getBean("personName", String.class);
        log.info("found: " + personName);
    }

}
