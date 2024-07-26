import React from "react";
import Table from "./Table";
import { supplierColumns } from "../utils";

const SupplierTable = ({ data }) => {
  return (
    <div style={{ marginTop: "70px" }}>
      <div className="main-container">
        <div className="container">
          <div className="title">
            <h2>Supplier</h2>
          </div>
        </div>
        <div className="desc">
          This dataset provides comprehensive information about various
          technology and electronics suppliers worldwide. It includes details
          such as Supplier ID, Supplier Name, Country, Contact Person, and
          Contact Email. This data is essential for managing global supplier
          networks, facilitating procurement processes, and maintaining
          effective communication with key contacts across different regions.
        </div>

        <Table columns={supplierColumns} data={data?.suppliers} />
      </div>
    </div>
  );
};

export default SupplierTable;
