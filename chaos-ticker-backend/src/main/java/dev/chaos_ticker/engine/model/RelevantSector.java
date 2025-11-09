package dev.chaos_ticker.engine.model;

public enum RelevantSector {
  TECH ("TECH"),
  ENERGY ("ENERGY"),
  FINANCE ("FINANCE");

  private String title;

  RelevantSector(String title) {
    this.title = title;
  }

  public String getTitle() {
    return title;
  }
}
