package com.joyldp.note.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Config {

    @Bean
    public String personName() {
        return "Brandon";
    }

}
