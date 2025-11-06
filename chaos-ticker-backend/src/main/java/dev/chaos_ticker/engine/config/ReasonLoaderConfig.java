package dev.chaos_ticker.engine.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;

@Configuration
public class ReasonLoaderConfig {
  @Bean
  public ReasonConfig reasonConfig() {
    try {
      ObjectMapper objectMapper = new ObjectMapper();
      ClassPathResource resource = new ClassPathResource("reasons.json");

      return objectMapper.readValue(resource.getInputStream(), ReasonConfig.class);
    } catch (IOException e) {
      throw new RuntimeException("Failed to load reasons configuration", e);
    }
  }
}