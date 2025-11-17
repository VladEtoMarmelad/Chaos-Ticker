"use client"

import { Company } from "@/components/Company";
import { useState } from 'react';
import { Company as CompanyType } from "@/types/Company";
import { Sidebar } from "@/components/Sidebar";
import { useCompanies } from "@/hooks/useCompanies";
import { useMarketUpdates } from "@/hooks/useMarketUpdates";

export default function Home() {
  const [choosedCompany, setСhoosedCompany] = useState<string|null>(null);
  const { companies, error } = useCompanies(setСhoosedCompany);
  const marketUpdates = useMarketUpdates(companies);
  
  if (error) return <h1>{error}</h1>
  if (!companies) return <p>Loading...</p>

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
