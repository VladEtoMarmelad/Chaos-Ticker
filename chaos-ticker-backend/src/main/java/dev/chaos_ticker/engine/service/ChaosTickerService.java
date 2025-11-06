package dev.chaos_ticker.engine.service;

import java.util.List;
import java.util.Random;
import org.springframework.stereotype.Service;
import dev.chaos_ticker.engine.config.ReasonLoaderConfig;
import dev.chaos_ticker.engine.model.Reason;

@Service
public class ChaosTickerService {

  private final ReasonLoaderConfig reasonLoaderConfig;

  public ChaosTickerService(ReasonLoaderConfig reasonLoaderConfig) {
    this.reasonLoaderConfig = reasonLoaderConfig;
  }

  public Reason getRandomTicker() {
    // get negative or positive
    Random random = new Random();
    int randomInt = random.nextInt(2);

    List<Reason> reasons;
    if (randomInt==0) { // get negative reason
      reasons = reasonLoaderConfig.reasonConfig().negative();
    } else { // get positive reason
      reasons = reasonLoaderConfig.reasonConfig().positive();
    }

    Reason randomReason = reasons.get(random.nextInt(reasons.size()));
    return randomReason;
  }
}
