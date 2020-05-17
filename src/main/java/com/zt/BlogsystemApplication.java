package com.zt;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

@SpringBootApplication
//@ServletComponentScan("com.zt.service")
@MapperScan(basePackages = "com.zt.mapper")
public class BlogsystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(BlogsystemApplication.class, args);
    }

}
