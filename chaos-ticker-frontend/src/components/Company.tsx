import { Company as CompanyInterface} from "@/types/Company";
import { Reason } from "@/types/Reason";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TooltipItem } from 'chart.js';
import { useRef, useState, useEffect } from 'react';
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
  options: any;
  story: Reason[];
}

export const Company = ({company, options, story}: CompanyProps) => {
  const sharePrice = useRef<number>(1000);
  const [labels, setLabels] = useState<string[]>([]);
  const [prices, setPrices] = useState<number[]>([]);

  useEffect(() => {
    if (story.length > 0) {
      const lastUpdate = story[story.length - 1];
      sharePrice.current = sharePrice.current + lastUpdate.sharePriceImpact;
      setPrices(prevPrices => [...prevPrices, sharePrice.current]);
      setLabels(prevLabels => [...prevLabels, `${prevLabels.length}`]);
    }
  }, [story]); 

  const chartOptions = {
    ...options,
    plugins: {
      ...options.plugins,
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<"line">) => {
            const index = context.dataIndex;
            const price = context.parsed.y;
            const lines = [];

            if (price !== null && price !== undefined) {
              lines.push(`Price: ${price.toFixed(2)}`);
            }

            if (story[index]) {
              lines.push(`Reason: ${story[index].text}`);
            }
            return lines;
          }
        }
      }
    }
  };

  const data = {
    labels,
    datasets: [
      {
        label: company.name,
        data: prices,
        segment: {
          // This function is called for every segment of the line
          borderColor: (ctx: any) => {
            // If the price at the start of the segment is higher than the end, it's a decrease
            if (ctx.p0.parsed.y > ctx.p1.parsed.y) return "red";

            // If the price at the start is lower, it's an increase
            if (ctx.p0.parsed.y < ctx.p1.parsed.y) return "green";

            // Otherwise, no change
            return "gray";
          }
        },
        backgroundColor: "#c8c8c833",
        yAxisID: "y"
      }
    ]
  };

  return <Line options={chartOptions} data={data} />
}