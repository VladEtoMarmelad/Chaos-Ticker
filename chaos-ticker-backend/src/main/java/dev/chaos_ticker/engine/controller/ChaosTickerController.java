package dev.chaos_ticker.engine.controller;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import dev.chaos_ticker.engine.model.Company;
import dev.chaos_ticker.engine.service.ChaosTickerService;

@RestController
@RequestMapping("/")
public class ChaosTickerController {
  private final ChaosTickerService chaosTickerService;

  public ChaosTickerController(ChaosTickerService chaosTickerService) {
    this.chaosTickerService = chaosTickerService;
  }

  @GetMapping("/companies")
  public List<Company> getCompanies() {
    return chaosTickerService.getCompanies();
  }
}
