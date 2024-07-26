import React from "react";
import Table from "./Table";
import { shipmentColumns } from "../utils";

const ShipmentTable = ({ data }) => {
  return (
    <div style={{ marginTop: "70px" }}>
      <div className="main-container">
        <div className="container">
          <div className="title">
            <h2>Shipment </h2>
          </div>
        </div>
        <div className="desc">
          This dataset provides detailed records of shipments, including
          Shipment ID, Date, Origin, Destination, Product ID, Quantity, Supplier
          ID, and Transport Mode. It captures the movement of goods across
          various global locations, specifying the type of transport used—either
          Sea or Air. This information is crucial for tracking shipment
          logistics, managing supply chain operations, and analyzing
          transportation efficiency.
        </div>

        <Table columns={shipmentColumns} data={data?.shipments} />
      </div>
    </div>
  );
};

export default ShipmentTable;
