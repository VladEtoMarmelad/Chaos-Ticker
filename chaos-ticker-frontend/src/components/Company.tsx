import { Company as CompanyInterface} from "@/types/Company";
import { Reason } from "@/types/Reason";
import { getChartData } from "@/utils/getChartData";
import { getChartOptions } from "@/utils/getChartOptions";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface CompanyProps {
  company: CompanyInterface;
  story: Reason[];
}

export const Company = ({company, story}: CompanyProps) => {
  const [labels, setLabels] = useState<string[]>([story.length.toString()]);
  const [prices, setPrices] = useState<number[]>([1000]);

  useEffect(() => {
    if (story.length > 0) {
      const lastUpdate = story[story.length - 1];
      const newPrice: number = prices[prices.length-1] + lastUpdate.sharePriceImpact;
      setPrices(prevPrices => [...prevPrices, newPrice]);
      setLabels(prevLabels => [...prevLabels, `${prevLabels.length}`]);
    }
  }, [story]); 

  return <Line 
    options={getChartOptions(story)} 
    data={getChartData(labels, prices, company)} 
  />
}