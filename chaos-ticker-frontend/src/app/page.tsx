"use client"

import { Client } from "@stomp/stompjs";
import { useEffect, useRef, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import SockJS from 'sockjs-client';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Line Chart - Multi Axis',
    },
  },
  scales: {
    y: {
      type: 'linear' as const,
      display: true,
      position: 'left' as const,
    },
    y1: {
      type: 'linear' as const,
      display: true,
      position: 'right' as const,
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

interface Reason {
  text: string;
  category: string;
  magnitude: string;
  sharePriceImpact: number;
  newPrice: number;
  relevantSectors: string[];
}

export default function Home() {
  const sharePrice = useRef<number>(1000)
  const [story, setStory] = useState<Reason[]>([]);
  const [labels, setLabels] = useState<string[]>([])

  useEffect(() => {
    console.log("The client is running, I'm setting it up. STOMP...");

    const stompClient = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws-market"),

      debug: (str) => {
        console.log(new Date(), str);
      },
      
      reconnectDelay: 5000,
    });

    stompClient.onConnect = (frame) => {
      console.log("SUCCESSFULLY CONNECTED: " + frame);

      stompClient.subscribe("/topic/market-updates", (message) => {
        const newUpdate = JSON.parse(message.body);
        console.log("MESSAGE RECEIVED:", newUpdate);

        setLabels((prevLabels) => [...prevLabels, `${prevLabels.length}`])
        sharePrice.current = sharePrice.current+newUpdate.sharePriceImpact
        setStory((prevStory) => [...prevStory, {...newUpdate, newPrice: sharePrice.current}])
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
  }, []); 

  const data = {
    labels,
    datasets: [
      {
        label: "SuperPuperCompany",
        data: labels.map((v, i) => {
          console.log(story)
          if (story[i]) {
            if (story[i].newPrice) {
              return story[i].newPrice
            } else {
              return 0
            }
          } else {
            return 0
          }
        }),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y"
      }
    ]
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Line options={options} data={data} />
      </main>
    </div>
  );
}
