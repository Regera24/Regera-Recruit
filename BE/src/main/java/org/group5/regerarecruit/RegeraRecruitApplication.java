package org.group5.regerarecruit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients
@SpringBootApplication
public class RegeraRecruitApplication {

    public static void main(String[] args) {
        SpringApplication.run(RegeraRecruitApplication.class, args);
    }
}
