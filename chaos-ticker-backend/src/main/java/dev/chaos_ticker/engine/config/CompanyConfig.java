package dev.chaos_ticker.engine.config;

import dev.chaos_ticker.engine.model.Company;
import java.util.List;

public record CompanyConfig(
  List<Company> companies
) {}
