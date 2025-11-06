# Chaos Ticker 📈

An interactive simulator of a fictional stock market where random world events bring real-time chaos to stock prices.

This project was created as a pet project to learn **Java/Spring Boot** from scratch and apply existing skills in **React/Next.js**. The main goal is to focus on interesting and non-trivial tasks, such as real-time communication via WebSockets and procedural content generation, while avoiding routine features like user authentication and CRUD operations.

## 🚀 Key Features

*   **Real-Time Simulation:** Stock charts and news feeds update for all users simultaneously without needing to refresh the page.
*   **Procedural Event Generation:** A Java-based backend engine creates unique "world news" that directly impacts stock prices.
*   **Context-Aware Events:** News is generated based on a company's sector (e.g., technological breakthroughs for IT giants, environmental issues for energy corporations).
*   **Anonymous Access:** No registration required. Just open the app and watch the market unfold.
*   **WebSocket Communication:** All real-time logic is built on WebSockets (using STOMP over SockJS) for a stable and efficient connection.

## 🛠️ Tech Stack

### **Backend**

*   **Language:** Java 17
*   **Framework:** Spring Boot 3
*   **Real-Time:** Spring WebSocket
*   **Scheduling:** Spring Scheduler (`@Scheduled`)
*   **Utilities:** Lombok

### **Frontend**

*   **Framework:** Next.js
*   **Library:** React
*   **Language:** TypeScript
*   **Real-Time Client:** Stomp.js & SockJS
*   **Charting:** React Chart.js 2