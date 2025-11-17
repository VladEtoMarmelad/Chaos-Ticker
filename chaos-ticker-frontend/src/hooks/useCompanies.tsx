import { useEffect, useState } from "react";
import { Company as CompanyType } from "@/types/Company";
import axios from "axios";

export const useCompanies = (setСhoosedCompany: (value: string) => void) => {
  const [companies, setCompanies] = useState<CompanyType[]|null>(null);
  const [error, setError] = useState<string|null>(null);

  useEffect(() => {
    const getCompanies = async () => {
      try {
        const response = await axios.get("http://localhost:8080/companies");
        setCompanies(response.data);
        setСhoosedCompany(response.data[0].name)
      } catch (error: unknown) {
        setError("Failed to load companies data");
        console.error(error);
      }
    };

    getCompanies();
  }, []);

  return { companies, error };
};