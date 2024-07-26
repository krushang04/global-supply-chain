import React, { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { loadData } from "./utils";
import Navbar from "./components/Navbar";
import "./App.css";

// Lazy load components
const AnalyticsChart = lazy(() => import("./components/AnalyticsChart"));
const ProductTable = lazy(() => import("./components/ProductTable"));
const SupplierTable = lazy(() => import("./components/SupplierTable"));
const ShipmentTable = lazy(() => import("./components/ShipmentTable"));
const NotFound = lazy(() => import("./components/NotFound"));

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

  const handleToggleChange = (name, checked) => {
    setIsOn((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<AnalyticsChart data={data} />} />
            <Route path="/analytics" element={<AnalyticsChart data={data} />} />
            <Route path="/product" element={<ProductTable data={data} />} />
            <Route path="/supplier" element={<SupplierTable data={data} />} />
            <Route path="/shipment" element={<ShipmentTable data={data} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
};

export default App;
