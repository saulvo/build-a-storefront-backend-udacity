import db from "@/database";
import { IProduct, IProductBase } from "@/types";

export class ProductModel {
  async getAll(): Promise<IProduct[]> {
    {
      try {
        const connect = await db.connect();

        const sqlQuery = "select * from products;";
        const result = await connect.query(sqlQuery);
        connect.release();
        return result.rows;
      } catch (error) {
        throw new Error("Cannot get any product");
      }
    }
  }
  async get(id: number): Promise<IProduct> {
    try {
      const connect = await db.connect();

      const sqlQuery = `SELECT * FROM products where id = ($1)`;
      const result = await connect.query(sqlQuery, [id]);
      connect.release();
      return result.rows[0];
    } catch (error) {
      throw new Error("Cannot found current product");
    }
  }
  async create(product: IProductBase): Promise<IProduct> {
    try {
      const sqlQuery =
        "INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *";
      const connect = await db.connect();

      const result = await connect.query(sqlQuery, [
        product.name,
        product.price,
        product.category,
      ]);
      connect.release();
      return result.rows[0];
    } catch (error) {
      throw new Error("Cannot create new product");
    }
  }
  async update(id: number, product: IProductBase): Promise<IProduct> {
    try {
      const sqlQuery =
        "UPDATE products SET name = $1, price = $2, category = $3 WHERE id = $4 RETURNING *";
      const connect = await db.connect();
      const result = await connect.query(sqlQuery, [
        product.name,
        product.price,
        product.category,
        id,
      ]);
      connect.release();
      return result.rows[0];
    } catch (error) {
      throw new Error("Cannot update current product");
    }
  }
  async delete(id: number): Promise<IProduct> {
    try {
      const sqlQuery = "DELETE FROM products WHERE id = $1 RETURNING *";
      const connect = await db.connect();
      const result = await connect.query(sqlQuery, [id]);
      connect.release();
      return result.rows[0];
    } catch (error) {
      throw new Error("Cannot delete current product");
    }
  }
}
