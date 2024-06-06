import db from "@/database";
import { BaseOrder, IOrder } from "@/types";

export class OrderModel {
  async getAll(): Promise<IOrder[]> {
    try {
      const sqlQueryOrder = "SELECT * FROM orders";
      const connect = await db.connect();
      const resultOrder = await connect.query(sqlQueryOrder);
      const sqlQueryOrderProduct = "SELECT * FROM order_products";
      const resultOrderProduct = await connect.query(sqlQueryOrderProduct);
      const orders = resultOrder.rows;
      const products = resultOrderProduct.rows;
      connect.release();

      return orders.map((order: IOrder) => {
        const orderProducts = products.filter(
          (product: any) => product.order_id === order.id,
        );
        return { ...order, products: orderProducts };
      });
    } catch (error) {
      throw new Error("Cannot get any order");
    }
  }
  async get(id: string): Promise<IOrder> {
    try {
      const sqlQueryOrder = "SELECT * FROM orders WHERE id = $1";
      const connect = await db.connect();
      const resultOrder = await connect.query(sqlQueryOrder, [id]);
      const sqlQueryOrderProduct =
        "SELECT * FROM order_products WHERE order_id = $1";
      const resultOrderProduct = await connect.query(sqlQueryOrderProduct, [
        id,
      ]);

      const products = resultOrderProduct.rows;
      connect.release();
      return { ...resultOrder.rows[0], products };
    } catch (error) {
      throw new Error("Cannot found current order");
    }
  }
  async create(order: BaseOrder): Promise<IOrder> {
    const { products, status, user_id } = order;
    try {
      const sqlQueryOrder =
        "INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *";
      const connect = await db.connect();
      const resultOrder = await connect.query(sqlQueryOrder, [user_id, status]);

      const newOrderId = resultOrder.rows[0].id;
      const sqlQueryOrderProduct =
        "INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3)";

      for (let product of products) {
        await connect.query(sqlQueryOrderProduct, [
          newOrderId,
          product.product_id,
          product.quantity,
        ]);
      }

      connect.release();
      return resultOrder.rows[0];
    } catch (error) {
      throw new Error("Cannot create new order");
    }
  }
  async update(id: number, order: BaseOrder): Promise<IOrder> {
    const { products, status, user_id } = order;
    try {
      const sqlQueryOrder =
        "UPDATE orders SET user_id = $1, status = $2 WHERE id = $3 RETURNING *";
      const connect = await db.connect();
      const resultOrder = await connect.query(sqlQueryOrder, [
        user_id,
        status,
        id,
      ]);
      const sqlQueryOrderProduct =
        "DELETE FROM order_products WHERE order_id = $1";
      await connect.query(sqlQueryOrderProduct, [id]);
      for (let product of products) {
        const sqlQueryOrderProduct =
          "INSERT INTO order_products (order_id, product_id) VALUES ($1, $2)";
        await connect.query(sqlQueryOrderProduct, [id, product.product_id]);
      }
      connect.release();
      return resultOrder.rows[0];
    } catch (error) {
      throw new Error("Cannot update current order");
    }
  }

  async delete(id: number): Promise<IOrder> {
    try {
      const connect = await db.connect();
      const sqlQueryOrder = "DELETE FROM orders WHERE id = $1 RETURNING *";
      const resultOrder = await connect.query(sqlQueryOrder, [id]);
      const sqlQueryOrderProduct =
        "DELETE FROM order_products WHERE order_id = $1";
      await connect.query(sqlQueryOrderProduct, [id]);
      connect.release();
      return resultOrder.rows[0];
    } catch (error) {
      throw new Error("Cannot delete current order");
    }
  }
}
