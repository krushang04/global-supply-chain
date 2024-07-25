import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
} from "recharts";

const ProductShipmentChart = ({ products, shipments }) => {
  const combinedData = shipments.map((shipment) => {
    const product = products.find(
      (p) => p["Product ID"] === shipment["Product ID"]
    );
    return {
      "Product Name": product ? product["Product Name"] : "Unknown",
      "Total Shipments": parseInt(shipment["Quantity"]),
    };
  });
  // Aggregate shipment quantities by product
  const aggregatedData = combinedData.reduce((acc, curr) => {
    const existing = acc.find(
      (item) => item["Product Name"] === curr["Product Name"]
    );
    if (existing) {
      existing["Total Shipments"] += curr["Total Shipments"];
    } else {
      acc.push({ ...curr });
    }
    return acc;
  }, []);
  return (
    <div>
      <BarChart
        width={1200}
        height={400}
        data={aggregatedData}
        margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Product Name" angle={-45} textAnchor="end">
          <Label value="Product Name" dy={75} />
        </XAxis>
        <YAxis>
          <Label
            value="Quantity"
            angle={-90}
            position="insideLeft"
            offset={10}
          />
        </YAxis>
        <Tooltip />
        <Legend layout="horizontal" verticalAlign="top" align="right" />
        <Bar dataKey="Total Shipments" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default ProductShipmentChart;
