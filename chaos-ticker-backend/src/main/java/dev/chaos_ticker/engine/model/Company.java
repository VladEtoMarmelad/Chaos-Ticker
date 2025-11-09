package dev.chaos_ticker.engine.model;

import java.util.List;

public record Company(
  String name,
  List<RelevantSector> relevantSectors
) {}
