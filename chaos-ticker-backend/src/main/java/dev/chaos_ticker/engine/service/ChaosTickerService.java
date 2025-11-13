package dev.chaos_ticker.engine.service;

import java.util.List;
import java.util.Optional;
import java.util.Random;
import org.springframework.stereotype.Service;
import dev.chaos_ticker.engine.config.CompanyLoaderConfig;
import dev.chaos_ticker.engine.config.ReasonLoaderConfig;
import dev.chaos_ticker.engine.model.Company;
import dev.chaos_ticker.engine.model.Reason;

@Service
public class ChaosTickerService {

  private final ReasonLoaderConfig reasonLoaderConfig;
  private final CompanyLoaderConfig companyLoaderConfig;
 
  public ChaosTickerService(ReasonLoaderConfig reasonLoaderConfig, CompanyLoaderConfig companyLoaderConfig) {
    this.reasonLoaderConfig = reasonLoaderConfig;
    this.companyLoaderConfig = companyLoaderConfig;
  }

  public Reason getRandomTicker() {
    Random random = new Random();

    List<Reason> reasons;
    List<Company> companies = companyLoaderConfig.companyConfig().companies();
    Company randomCompany = companies.get(random.nextInt(companies.size()));

    // get negative or positive
    boolean isNegative = random.nextBoolean();
    if (isNegative) { // get negative reason
      reasons = reasonLoaderConfig.reasonConfig().negative();
    } else { // get positive reason
      reasons = reasonLoaderConfig.reasonConfig().positive();
    }

    List<Reason> filteredReasons = reasons.stream().filter((Reason reason) -> 
      reason.relevantSectors().isEmpty() || 
      reason.relevantSectors().stream().anyMatch(randomCompany.relevantSectors()::contains)
    ).toList();

    Reason randomReason = filteredReasons.get(random.nextInt(filteredReasons.size()));
    Reason randomReasonWithCompany = new Reason(
      randomReason.text(),
      randomReason.category(),
      randomReason.sharePriceImpact(),
      randomReason.relevantSectors(),
      Optional.of(randomCompany)
    );
    return randomReasonWithCompany;
  }

  public List<Company> getCompanies() {
    return companyLoaderConfig.companyConfig().companies();
  }
}
