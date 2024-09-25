import { RowDataPacket, ResultSetHeader } from "mysql2"; // Import type for rows returned from queries
import { promisePool } from "../config/db";

// Function to select all products
const selectAll = async () => {
  try {
    const [rows]: [RowDataPacket[], any] = await promisePool.query(
      "SELECT * FROM product"
    );
    return rows;
  } catch (err) {
    console.error("Database query error:", err);
  }
};

// Function to delete a product by student ID
const deleteProductById = async (studentid: number): Promise<void> => {
  try {
    console.log(`Attempting to delete product with student ID: ${studentid}`);
    const [result] = await promisePool.query<ResultSetHeader>(
      "DELETE FROM product WHERE id = ?",
      [studentid]
    );
    console.log("Delete result:", result);
    if (result.affectedRows === 0) {
      console.warn(`No product found with student ID: ${studentid}`);
    }
  } catch (err) {
    console.error("Database deletion error:", err);
    throw err;
  }
};

// Function to insert a new product
const insertProduct = async (
  studentid: number,
  name: string,
  lastname: string // changed price to lastname as string
): Promise<void> => {
  try {
    const [result] = await promisePool.query<ResultSetHeader>(
      "INSERT INTO product (id, name, lastname) VALUES (?, ?, ?)",
      [studentid, name, lastname]
    );
    console.log("Insert result:", result);
    if (result.affectedRows === 0) {
      console.warn("Insert operation did not affect any rows");
    }
  } catch (err) {
    console.error("Database insertion error:", err);
    throw err;
  }
};

// Function to update a product by student ID
const updateProduct = async (
  studentid: number,
  name: string,
  lastname: string // changed price to lastname as string
): Promise<void> => {
  try {
    const [result] = await promisePool.query<ResultSetHeader>(
      "UPDATE product SET name = ?, lastname = ? WHERE id = ?",
      [name, lastname, studentid]
    );
    console.log("Update result:", result);
    if (result.affectedRows === 0) {
      console.warn(`No product found with student ID: ${studentid}`);
    }
  } catch (err) {
    console.error("Database update error:", err);
    throw err;
  }
};

export default { selectAll, deleteProductById, insertProduct, updateProduct };
