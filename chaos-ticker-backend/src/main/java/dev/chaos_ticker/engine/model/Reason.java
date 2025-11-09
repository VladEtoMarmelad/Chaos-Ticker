package dev.chaos_ticker.engine.model;

import java.util.List;
import java.util.Optional;

public record Reason(
  String text,
  Category category,
  int sharePriceImpact,
  List<RelevantSector> relevantSectors,
  Optional<Company> affectedCompany
) {}