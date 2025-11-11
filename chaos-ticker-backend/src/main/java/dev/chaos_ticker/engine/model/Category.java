package dev.chaos_ticker.engine.model;

public enum Category {
  FINANCIAL ("FINANCIAL"),
  LEGAL ("LEGAL"),
  ECOLOGICAL ("ECOLOGICAL"),
  TECHNOLOGICAL ("TECHNOLOGICAL"),
  POLITICAL ("POLITICAL"),
  SOCIAL ("SOCIAL"),
  OPERATIONAL ("OPERATIONAL");

  private String title;

  Category(String title) {
    this.title = title;
  }

  public String getTitle() {
    return title;
  }
}
