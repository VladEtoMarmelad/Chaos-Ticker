package dev.chaos_ticker.engine.model;

public enum RelevantSector {
  TECH ("TECH"),
  ENERGY ("ENERGY"),
  FINANCE ("FINANCE"),
  HEALTHCARE ("HEALTHCARE"),
  RETAIL ("RETAIL"),
  AUTOMOTIVE ("AUTOMOTIVE"),
  MEDIA ("MEDIA");

  private String title;

  RelevantSector(String title) {
    this.title = title;
  }

  public String getTitle() {
    return title;
  }
}
