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

const SupplierQtys = ({ suppliers, shipments }) => {
  const getTotalQuantityByCountry = (suppliers, shipments) => {
    const countryQuantities = {};

    // Map shipments to suppliers by Supplier ID
    shipments?.forEach((shipment) => {
      const supplier = suppliers.find(
        (s) => s["Supplier ID"] === shipment["Supplier ID"]
      );
      if (supplier) {
        const country = supplier.Country;
        if (!countryQuantities[country]) {
          countryQuantities[country] = 0;
        }
        countryQuantities[country] += parseInt(shipment.Quantity, 10);
      }
    });

    return Object.entries(countryQuantities)?.map(
      ([country, totalQuantity]) => ({ country, totalQuantity })
    );
  };

  const data = getTotalQuantityByCountry(suppliers, shipments);
  return (
    <>
      <BarChart width={1200} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="country">
          <Label value="Country" dy={12} />
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
        <Bar dataKey="totalQuantity" fill="#82ca9d" />
      </BarChart>
    </>
  );
};

export default SupplierQtys;
