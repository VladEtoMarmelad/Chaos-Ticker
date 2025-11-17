import { useEffect, useState } from "react";
import { Company as CompanyType } from "@/types/Company";
import { Reason } from "@/types/Reason";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export const useMarketUpdates = (companies: CompanyType[] | null) => {
  const [marketUpdates, setMarketUpdates] = useState<Record<string, Reason[]>>({});

  useEffect(() => {
    if (!companies) return;

    const stompClient = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws-market"),
      reconnectDelay: 5000
    });

    stompClient.onConnect = () => {
      stompClient.subscribe("/topic/market-updates", (message) => {
        const newUpdates: Reason[] = JSON.parse(message.body);

        setMarketUpdates(prevUpdates => {
          const updated = { ...prevUpdates };
          newUpdates.forEach((update: Reason) => {
            if (update.affectedCompany?.name) {
              const companyName = update.affectedCompany.name;
              const existingUpdates = updated[companyName] || [{ "text": "Initial", "sharePriceImpact": 1000, "newPrice": 1000 }];
              updated[companyName] = [...existingUpdates, update];
            }
          });
          return updated;
        });
      });
    };

    stompClient.onStompError = (frame) => {
      console.error("Error: " + frame.headers["message"]);
      console.error("Details: " + frame.body);
    };

    stompClient.activate();

    return () => {
      stompClient.deactivate();
      console.log("The client has been deactivated.");
    };
  }, [companies]);

  return marketUpdates;
};