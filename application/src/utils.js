import Papa from "papaparse";
import suppliersCSV from "./data/suppliers.csv";
import productsCSV from "./data/products.csv";
import shipmentsCSV from "./data/shipments.csv";

export const fetchCSVData = async (url) => {
  return new Promise((resolve, reject) => {
    Papa.parse(url, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        // Remove empty fields and rows
        const filteredData = result.data
          .filter((row) =>
            Object.values(row).some((value) => value.trim() !== "")
          )
          .map((row) => {
            return Object.fromEntries(
              Object.entries(row).filter(([key, value]) => value.trim() !== "")
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


