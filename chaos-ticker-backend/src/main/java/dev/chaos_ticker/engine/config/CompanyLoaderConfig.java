package dev.chaos_ticker.engine.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;

@Configuration
public class CompanyLoaderConfig {
  @Bean
  public CompanyConfig companyConfig() {
    try {
      ObjectMapper objectMapper = new ObjectMapper();
      ClassPathResource resource = new ClassPathResource("companies.json");

      return objectMapper.readValue(resource.getInputStream(), CompanyConfig.class);
    } catch (IOException e) {
      throw new RuntimeException("Failed to load reasons configuration", e);
    }
  }
}