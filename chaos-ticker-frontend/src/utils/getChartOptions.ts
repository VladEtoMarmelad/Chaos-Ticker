import { Reason } from "@/types/Reason";
import { TooltipItem } from 'chart.js';

export const getChartOptions = (story: Reason[]) => { 
  return { 
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Chart.js Line Chart - Multi Axis"
      },
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
    },
    scales: {
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const
      },
      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        grid: {
          drawOnChartArea: false
        }
      }
    }
  }
};