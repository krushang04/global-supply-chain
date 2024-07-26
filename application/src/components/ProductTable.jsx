import React from "react";
import Table from "./Table";
import { productColumns } from "../utils";

const ProductTable = ({ data }) => {
  return (
    <div style={{ marginTop: "70px" }}>
      <div className="main-container">
        <div className="container">
          <div className="title">
            <h2>Product </h2>
          </div>
        </div>
        <div className="desc">
          This dataset contains detailed information about various products,
          categorized into Electronics and Home Appliances. Each entry includes
          Product ID, Product Name, Category, Unit Price, and Stock Quantity.
          This data is valuable for inventory management, pricing strategies,
          and sales analysis, providing insights into stock levels and product
          costs across different categories.
        </div>

        <Table columns={productColumns} data={data.products} />
      </div>
    </div>
  );
};

export default ProductTable;
