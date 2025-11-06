package dev.chaos_ticker.engine.config;

import dev.chaos_ticker.engine.model.Reason;
import java.util.List;

public record ReasonConfig(
  List<Reason> negative,
  List<Reason> positive
) {}