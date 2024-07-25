import React, { useState, useEffect, useMemo } from "react";
import Charts from "./components/ReportCharts/Charts";
import Table from "./components/Table";
import { loadData, numberSort } from "./utils";
import QtyModeBarChart from "./components/ReportCharts/QtyModeBarChart";
import ProductShipmentChart from "./components/ReportCharts/ProductShipmentChart";
import SupplierQtys from "./components/ReportCharts/SupplierQtys";
import ToggleSwitch from "./components/ToggleSwitch";
import "./App.css";

const App = () => {
  const [data, setData] = useState({
    suppliers: [],
    products: [],
    shipments: [],
  });
  const [isOn, setIsOn] = useState({
    productTable: false,
    supplierTable: false,
    shipmentTable: false,
    qtyModeChart: false,
    lineChart: false,
    productShipmentChart: false,
    productCountryChart: false,
  });

  useEffect(() => {
    loadData().then(setData);
  }, []);

  const productColumns = useMemo(
    () => [
      { Header: "Product ID", accessor: "Product ID", sortType: numberSort },
      {
        Header: "Product Name",
        accessor: "Product Name",
      },
      { Header: "Category", accessor: "Category" },
      {
        Header: "Unit Price",
        accessor: "Unit Price",
        sortType: numberSort,
      },
      {
        Header: "Stock Quantity",
        accessor: "Stock Quantity",
        sortType: numberSort,
      },
    ],
    []
  );

  const supplierColumns = useMemo(
    () => [
      { Header: "Supplier ID", accessor: "Supplier ID", sortType: numberSort },
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

  const shipmentColumns = useMemo(
    () => [
      { Header: "Shipment ID", accessor: "Shipment ID", sortType: numberSort },
      { Header: "Date", accessor: "Date" },
      { Header: "Origin", accessor: "Origin" },
      { Header: "Destination", accessor: "Destination" },
      { Header: "Product ID", accessor: "Product ID", sortType: numberSort },
      { Header: "Quantity", accessor: "Quantity", sortType: numberSort },
      { Header: "Supplier ID", accessor: "Supplier ID", sortType: numberSort },
      { Header: "Transport Mode", accessor: "Transport Mode" },
    ],
    []
  );

  const handleToggleChange = (name, checked) => {
    setIsOn((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  return (
    <div className="App">
      <div style={{ color: "#2fa9de" }}>
        <center>
          <h1>Supply Chain Table and Reports</h1>
        </center>
      </div>
      <div className="main-container">
        <div className="container">
          <div className="title">
            <h2>Product Data Table</h2>
          </div>
          <ToggleSwitch
            isOn={isOn}
            setIsOn={handleToggleChange}
            name="productTable"
          />
        </div>
        <div className="desc">This table displays all the product data</div>

        {isOn?.productTable && (
          <Table columns={productColumns} data={data.products} />
        )}
      </div>

      <div className="main-container">
        <div className="container">
          <div className="title">
            <h2>Supplier Data Table</h2>
          </div>
          <ToggleSwitch
            isOn={isOn}
            setIsOn={handleToggleChange}
            name="supplierTable"
          />
        </div>
        <div className="desc">This table displays all the supplier data</div>
        {isOn?.supplierTable && (
          <Table columns={supplierColumns} data={data.suppliers} />
        )}
      </div>

      <div className="main-container">
        <div className="container">
          <div className="title">
            <h2>Shipment Data Table</h2>
          </div>
          <ToggleSwitch
            isOn={isOn}
            setIsOn={handleToggleChange}
            name="shipmentTable"
          />
        </div>
        <div className="desc">This table displays all the shipment data</div>
        {isOn?.shipmentTable && (
          <Table columns={shipmentColumns} data={data.shipments} />
        )}
      </div>

      <div className="main-container">
        <div className="container">
          <div className="title">
            <h2>Shipments overs a time - Chart</h2>
          </div>
          <ToggleSwitch
            isOn={isOn}
            setIsOn={handleToggleChange}
            name="lineChart"
          />
        </div>
        <div className="chartDesc">
          {isOn?.lineChart && (
            <div style={{ padding: "20px" }}>
              <Charts data={data?.shipments} />
            </div>
          )}
          <div className="desc">
            This chart illustrates the number of shipments completed compared to
            specific dates, showing trends and variations in shipment volume
            over the given time period.
          </div>
        </div>
      </div>

      <div className="main-container">
        <div className="container">
          <div className="title">
            <h2>Transport Mode vs Quantity - Chart</h2>
          </div>
          <ToggleSwitch
            isOn={isOn}
            setIsOn={handleToggleChange}
            name="qtyModeChart"
          />
        </div>
        <div className="chartDesc">
          {isOn?.qtyModeChart && <QtyModeBarChart data={data?.shipments} />}
          <div className="desc">
            This chart displays the quantities of shipments categorized by
            transport mode, highlighting the distribution of shipments across
            different transportation methods.
          </div>
        </div>
      </div>

      <div className="main-container">
        <div className="container">
          <div className="title">
            <h2>Product Shipments - Chart</h2>
          </div>
          <ToggleSwitch
            isOn={isOn}
            setIsOn={handleToggleChange}
            name="productShipmentChart"
          />
        </div>
        <div className="chartDesc">
          {isOn?.productShipmentChart && (
            <ProductShipmentChart
              products={data?.products}
              shipments={data?.shipments}
            />
          )}
          <div className="desc">
            This chart displays the quantities of items shipped, showing the
            distribution of different items by their shipment volumes
          </div>
        </div>
      </div>

      <div className="main-container">
        <div className="container">
          <div className="title">
            <h2>Product Shipments to Country - Chart</h2>
          </div>
          <ToggleSwitch
            isOn={isOn}
            setIsOn={handleToggleChange}
            name="productCountryChart"
          />
        </div>
        <div className="chartDesc">
          {isOn?.productCountryChart && (
            <SupplierQtys
              suppliers={data?.suppliers}
              shipments={data?.shipments}
            />
          )}
          <div
            className="desc"
            style={{ width: isOn?.productCountryChart ? "25%" : "auto" }}
          >
            This chart illustrates the quantities of product shipments to
            various countries, highlighting the distribution of shipments across
            different international destinations
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
