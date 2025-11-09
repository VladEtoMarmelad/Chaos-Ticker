import { Company as CompanyInterface} from "@/types/Company";
import { Reason } from "@/types/Reason";
import { Client } from "@stomp/stompjs";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useRef, useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import SockJS from "sockjs-client";

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
}

export const Company = ({company, options}: CompanyProps) => {
  const sharePrice = useRef<number>(1000);
  const [story, setStory] = useState<Reason[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    const stompClient = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws-market"),
      reconnectDelay: 5000
    });

    stompClient.onConnect = () => {
      stompClient.subscribe("/topic/market-updates", (message) => {
        const newUpdate: Reason = JSON.parse(message.body);

        if (newUpdate.affectedCompany.name === company.name) {
          setLabels((prevLabels) => [...prevLabels, `${prevLabels.length}`])
          sharePrice.current = sharePrice.current+newUpdate.sharePriceImpact
          setStory((prevStory) => [...prevStory, {...newUpdate, newPrice: sharePrice.current}])
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
  }, []); 

  const data = {
    labels,
    datasets: [
      {
        label: company.name,
        data: labels.map((v, i) => {
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

  return <Line options={options} data={data} />
}