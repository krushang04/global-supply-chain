import axios from "axios";
import Papa from "papaparse";
import suppliersCSV from "./data/suppliers.csv";
import productsCSV from "./data/products.csv";
import shipmentsCSV from "./data/shipments.csv";

export const fetchCSVData = async (url) => {
  try {
    const response = await axios.get(url, {
      responseType: "text",
    });

    return new Promise((resolve, reject) => {
      Papa.parse(response.data, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          const filteredData = result.data
            .filter((row) =>
              Object.values(row).some((value) => value.trim() !== "")
            )
            .map((row) => {
              return Object.fromEntries(
                Object.entries(row).filter(
                  ([key, value]) => value.trim() !== ""
                )
              );
            });

          resolve(filteredData);
        },
        error: (error) => {
          console.error("CSV Parsing Error:", error);
          reject(error);
        },
      });
    });
  } catch (error) {
    console.error("HTTP Request Error:", error);
    throw error;
  }
};

export const loadData = async () => {
  try {
    const [suppliers, products, shipments] = await Promise.all([
      fetchCSVData(suppliersCSV),
      fetchCSVData(productsCSV),
      fetchCSVData(shipmentsCSV),
    ]);
    return { suppliers, products, shipments };
  } catch (error) {
    console.error("Error loading data:", error);
    throw error;
  }
};

export const numberSort = (rowA, rowB, id) => {
  const valueA = rowA.original[id];
  const valueB = rowB.original[id];
  return valueA - valueB;
};

export const shipmentColumns = [
  { Header: "Shipment ID", accessor: "Shipment ID", sortType: numberSort },
  { Header: "Date", accessor: "Date" },
  { Header: "Origin", accessor: "Origin" },
  { Header: "Destination", accessor: "Destination" },
  { Header: "Product ID", accessor: "Product ID", sortType: numberSort },
  { Header: "Quantity", accessor: "Quantity", sortType: numberSort },
  { Header: "Supplier ID", accessor: "Supplier ID", sortType: numberSort },
  { Header: "Transport Mode", accessor: "Transport Mode" },
];

export const supplierColumns = [
  { Header: "Supplier ID", accessor: "Supplier ID", sortType: numberSort },
  {
    Header: "Supplier Name",
    accessor: "Supplier Name",
  },
  { Header: "Country", accessor: "Country" },
  { Header: "Contact Person", accessor: "Contact Person" },
  { Header: "Contact Email", accessor: "Contact Email" },
];

export const productColumns = [
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
];
