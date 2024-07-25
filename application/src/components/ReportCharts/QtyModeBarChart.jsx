import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  Label,
  LineChart,
  Cell,
} from "recharts";

const QtyModeBarChart = ({ data }) => {
  const aggregatedData = data.reduce((acc, curr) => {
    if (!acc[curr?.["Transport Mode"]]) {
      acc[curr?.["Transport Mode"]] = 0;
    }
    acc[curr?.["Transport Mode"]] += parseFloat(curr?.["Quantity"]);
    return acc;
  }, {});

  const chartData = Object.keys(aggregatedData).map((key) => ({
    "Transport Mode": key,
    "Total Quantity": aggregatedData[key],
  }));

  return (
    <BarChart
      width={600}
      height={600}
      data={chartData}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="Transport Mode">
        <Label value="Transport Mode" position="insideBottom" dy={8} />
      </XAxis>
      <YAxis>
        <Label
          value="Total Quantity"
          angle={-90}
          position="insideLeft"
          offset={10}
        />
      </YAxis>
      <Tooltip />
      <Legend layout="horizontal" verticalAlign="top" align="right" />
      <Bar
        dataKey="Total Quantity"
        fill="#4bc0c0"
        label={({ x, y, value }) => {
          return (
            <text x={x} y={y} dy={20} fill="white" textAnchor="right">
              {value}
            </text>
          );
        }}
      >
        {chartData.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={
              entry?.["Transport Mode"].toLowerCase() === "sea"
                ? "#8884d8"
                : "#82ca9d"
            }
          />
        ))}
      </Bar>
    </BarChart>
  );
};

export default QtyModeBarChart;
