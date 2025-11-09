"use client"

import { Company } from "@/components/Company";
import { useEffect, useState } from 'react';
import { Company as CompanyInterface} from "@/types/Company";
import axios from "axios";

const options = {
  responsive: true,
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: "Chart.js Line Chart - Multi Axis",
    },
  },
  scales: {
    y: {
      type: "linear" as const,
      display: true,
      position: "left" as const,
    },
    y1: {
      type: "linear" as const,
      display: true,
      position: "right" as const,
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

export default function Home() {
  const [companies, setCompanies] = useState<CompanyInterface[]|null>(null);

  useEffect(() => {
    const getAndUseCompanies = async () => {
      const companies = await axios.get("http://localhost:8080/companies")
      setCompanies(companies.data)
    }
    getAndUseCompanies()
  }, [])

  if (!companies) return <p>Загрузка...</p>

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        {companies.map((company: CompanyInterface, index: number) => 
          <Company company={company} options={options} key={index}/>
        )}
      </main>
    </div>
  );
}
