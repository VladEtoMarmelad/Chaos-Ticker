package dev.chaos_ticker.engine.model;

import java.util.List;

public record Reason(
  String text,
  String category,
  String magnitude,
  int sharePriceImpact,
  List<String> relevantSectors
) {}