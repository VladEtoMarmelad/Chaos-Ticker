"use client"

import { Company } from "@/components/Company";
import { useEffect, useState } from 'react';
import { Company as CompanyInterface} from "@/types/Company";
import { Reason } from "@/types/Reason";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import axios from "axios";

export default function Home() {
  const [companies, setCompanies] = useState<CompanyInterface[]|null>(null);
  const [marketUpdates, setMarketUpdates] = useState<Record<string, Reason[]>>({});

  useEffect(() => {
    const getAndUseCompanies = async () => {
      const companies = await axios.get("http://localhost:8080/companies")
      setCompanies(companies.data)
    }
    getAndUseCompanies()
  }, [])

  useEffect(() => {
    if (!companies) return;

    const stompClient = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws-market"),
      reconnectDelay: 5000
    });

    stompClient.onConnect = () => {
      stompClient.subscribe("/topic/market-updates", (message) => {
        const newUpdate: Reason = JSON.parse(message.body);

        if (newUpdate.affectedCompany?.name) {
          const companyName = newUpdate.affectedCompany.name;
          setMarketUpdates(prevUpdates => {
            const existingUpdates = prevUpdates[companyName] || [{"text": "Initial", "sharePriceImpact": 1000, "newPrice": 1000}];
            return {
              ...prevUpdates,
              [companyName]: [...existingUpdates, newUpdate]
            };
          });
        }
      });
    };

    stompClient.onStompError = (frame) => {
      console.error("Error on the broker's side: " + frame.headers["message"]);
      console.error("Details: " + frame.body);
    };

    stompClient.activate();

    return () => {
      stompClient.deactivate();
      console.log("The client has been deactivated.");
    };
  }, [companies]);

  if (!companies) return <p>Загрузка...</p>

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        {companies.map((company: CompanyInterface, index: number) => 
          <Company 
            company={company} 
            key={index}
            story={marketUpdates[company.name] || []}
          />
        )}
      </main>
    </div>
  );
}
