import React from "react";
import Charts from "./ReportCharts/Charts";
import QtyModeBarChart from "./ReportCharts/QtyModeBarChart";
import ProductShipmentChart from "./ReportCharts/ProductShipmentChart";
import SupplierQtys from "./ReportCharts/SupplierQtys";

const AnalyticsChart = ({ data }) => {
  return (
    <div style={{ marginTop: "70px" }}>
      <div className="main-container">
        <div className="container">
          <div className="title">
            <h2>Shipments overs a time </h2>
          </div>
        </div>
        <div className="chartDesc">
          <div style={{ padding: "20px" }}>
            <Charts data={data?.shipments} />
          </div>

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
            <h2>Transport Mode Comparison </h2>
          </div>
        </div>
        <div className="chartDesc">
          <QtyModeBarChart data={data?.shipments} />
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
            <h2>Product Shipments </h2>
          </div>
        </div>
        <div className="chartDesc">
          <ProductShipmentChart
            products={data?.products}
            shipments={data?.shipments}
          />

          <div className="desc">
            This chart displays the quantities of items shipped, showing the
            distribution of different items by their shipment volumes
          </div>
        </div>
      </div>

      <div className="main-container">
        <div className="container">
          <div className="title">
            <h2>Product Shipments to Country </h2>
          </div>
        </div>
        <div className="chartDesc">
          <SupplierQtys
            suppliers={data?.suppliers}
            shipments={data?.shipments}
          />

          <div className="desc">
            This chart illustrates the quantities of product shipments to
            various countries, highlighting the distribution of shipments across
            different international destinations
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsChart;
