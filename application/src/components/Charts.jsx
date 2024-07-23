import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import styles from "../styles/Charts.module.css";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const Charts = ({ data }) => {
  const chartData = {
    labels: data.map((d) => d.Date),
    datasets: [
      {
        label: "Shipment Quantities",
        data: data.map((d) => d.Quantity),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className={styles.chartContainer}>
      <h2 className={styles.chartHeader}>Shipments Over Time</h2>
      <Line data={chartData} />
    </div>
  );
};

export default Charts;
