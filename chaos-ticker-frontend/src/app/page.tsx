"use client"

import { Company } from "@/components/Company";
import { useEffect, useState } from 'react';
import { Company as CompanyType } from "@/types/Company";
import { Reason } from "@/types/Reason";
import { Client } from "@stomp/stompjs";
import { Sidebar } from "@/components/Sidebar";
import SockJS from "sockjs-client";
import axios from "axios";

export default function Home() {
  const [companies, setCompanies] = useState<CompanyType[]|null>(null);
  const [marketUpdates, setMarketUpdates] = useState<Record<string, Reason[]>>({});
  const [choosedCompany, setСhoosedCompany] = useState<string|null>(null);

  useEffect(() => {
    const getAndUseCompanies = async () => {
      const companies = await axios.get("http://localhost:8080/companies")
      setCompanies(companies.data)
      setСhoosedCompany(companies.data[0].name)
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
        const newUpdates: Reason[] = JSON.parse(message.body);

        newUpdates.forEach((update: Reason) => {
          if (update.affectedCompany?.name) {
            const companyName = update.affectedCompany.name;
            setMarketUpdates(prevUpdates => {
              const existingUpdates = prevUpdates[companyName] || [{"text": "Initial", "sharePriceImpact": 1000, "newPrice": 1000}];
              return {
                ...prevUpdates,
                [companyName]: [...existingUpdates, update]
              };
            });
          };
        });
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
    <div className="flex flex-row size-full font-sans dark:bg-black">
      <Sidebar 
        companies={companies}
        choosedCompany={choosedCompany}
        setСhoosedCompany={setСhoosedCompany}
      />
      <main className="size-full">
        {companies.map((company: CompanyType, index: number) => 
          <div key={index} className="size-full" style={{display: choosedCompany===company.name ? '' : 'none'}}>
            <Company 
              company={company} 
              story={marketUpdates[company.name] || []}
            />
          </div>
        )}
      </main>
    </div>
  );
}
