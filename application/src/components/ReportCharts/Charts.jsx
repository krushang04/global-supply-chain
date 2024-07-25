import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";
import styles from "../../styles/Charts.module.css";

const Charts = ({ data }) => {
  const chartShipmentsData = data.map((d) => ({
    Date: d.Date,
    Quantity: parseFloat(d.Quantity),
  }));

  chartShipmentsData?.sort((a, b) => a?.["Date"] - b?.["Date"]);

  return (
    <div className={styles.chartContainer}>
      <ResponsiveContainer width={1200} height={400}>
        <LineChart data={chartShipmentsData} margin={{ bottom: 50 }}>
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis dataKey={"Date"}>
            <Label value={"Date"} offset={5} position="insideBottom" dy={30} />
          </XAxis>
          <YAxis>
            <Label
              value={"Quantity"}
              angle={-90}
              position="insideLeft"
              offset={10}
            />
          </YAxis>
          <Tooltip />
          <Legend layout="horizontal" verticalAlign="top" align="right" />
          <Line
            type="monotone"
            dataKey={"Quantity"}
            stroke="#4bc0c0"
            dot={true}
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Charts;
