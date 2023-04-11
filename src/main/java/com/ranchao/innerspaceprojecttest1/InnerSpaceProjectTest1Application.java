package com.ranchao.innerspaceprojecttest1;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@MapperScan("com/ranchao/innerspaceprojecttest1/mapper")
@SpringBootApplication
public class InnerSpaceProjectTest1Application {

    public static void main(String[] args) {
        SpringApplication.run(InnerSpaceProjectTest1Application.class, args);
    }

}
