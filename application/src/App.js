import React, { useState, useEffect } from "react";
import Charts from "./components/Charts";
import Tables from "./components/Tables";
import { loadData } from "./utils";

const App = () => {
  const [data, setData] = useState({
    suppliers: [],
    products: [],
    shipments: [],
  });

  useEffect(() => {
    loadData().then(setData);
  }, []);

  const productColumns = React.useMemo(
    () => [
      { Header: "Product ID", accessor: "Product ID" },
      {
        Header: "Product Name",
        accessor: "Product Name",
        // Filter: ColumnFilter, // Add ColumnFilter here
      },
      { Header: "Category", accessor: "Category" },
      {
        Header: "Unit Price",
        accessor: "Unit Price",
        sortType: "basic",
      },
      {
        Header: "Stock Quantity",
        accessor: "Stock Quantity",
        sortType: "basic",
      },
    ],
    []
  );

  const supplierColumns = React.useMemo(
    () => [
      { Header: "Supplier ID", accessor: "Supplier ID" },
      {
        Header: "Supplier Name",
        accessor: "Supplier Name",
      },
      { Header: "Country", accessor: "Country" },
      { Header: "Contact Person", accessor: "Contact Person" },
      { Header: "Contact Email", accessor: "Contact Email" },
    ],
    []
  );

  const shipmentColumns = React.useMemo(
    () => [
      { Header: "Shipment ID", accessor: "Shipment ID" },
      { Header: "Date", accessor: "Date" },
      { Header: "Origin", accessor: "Origin" },
      { Header: "Destination", accessor: "Destination" },
      { Header: "Product ID", accessor: "Product ID" },
      { Header: "Quantity", accessor: "Quantity" },
      { Header: "Supplier ID", accessor: "Supplier ID" },
      { Header: "Transport Mode", accessor: "Transport Mode" },
    ],
    []
  );

  return (
    <div className="App">
      <h1>Trademo Supply Chain Dashboard</h1>
      <Charts data={data.shipments} />
      <h2>Products</h2>
      <Tables columns={productColumns} data={data.products} />
      <h2>Suppliers</h2>
      <Tables columns={supplierColumns} data={data.suppliers} />
      <h2>Shipments</h2>
      <Tables columns={shipmentColumns} data={data.shipments} />
    </div>
  );
};

export default App;
