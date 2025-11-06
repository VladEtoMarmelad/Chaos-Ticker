package dev.chaos_ticker.engine;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@EnableScheduling
@RestController
public class ChaosTickerBackendApplication {
  public static void main(String[] args) {
    SpringApplication.run(ChaosTickerBackendApplication.class, args);
  }
}