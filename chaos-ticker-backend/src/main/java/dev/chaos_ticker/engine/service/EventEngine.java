package dev.chaos_ticker.engine.service;

import dev.chaos_ticker.engine.model.Reason;

import java.util.List;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class EventEngine {

  private final SimpMessagingTemplate messagingTemplate;
  private final ChaosTickerService chaosTickerService;

  public EventEngine(SimpMessagingTemplate messagingTemplate, ChaosTickerService chaosTickerService) {
    this.messagingTemplate = messagingTemplate;
    this.chaosTickerService = chaosTickerService;
  }

  @Scheduled(fixedRate = 5000)
  public void generateAndBroadcastEvent() {
    List<Reason> reason = chaosTickerService.getRandomTicker();
    messagingTemplate.convertAndSend("/topic/market-updates", reason);
  }
}