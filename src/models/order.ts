import db from "@/database";
import { IOrderBase, IOrder, IOrderDetail } from "@/types";

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
  async get(id: string): Promise<IOrderDetail> {
    try {
      const sqlQuery = `
            SELECT 
                o.*, 
                p.*, 
                u.*, 
                op.quantity 
            FROM 
                orders o 
            JOIN 
              users u ON o.user_id = u.id 
            JOIN 
                order_products op ON o.id = op.order_id
            JOIN 
                products p ON op.product_id = p.id 
            WHERE 
                o.id = $1
        `;

      const connect = await db.connect();
      const result = await connect.query(sqlQuery, [id]);
      connect.release();

      if (result.rows.length === 0) {
        throw new Error("Order not found");
      }

      const order: IOrderDetail = {
        id: result.rows[0].id,
        status: result.rows[0].status,
        user: {
          id: result.rows[0].user_id,
          firstname: result.rows[0].firstname,
          lastname: result.rows[0].lastname,
        },
        products: result.rows.map((row) => ({
          product_id: row.product_id,
          name: row.name,
          price: row.price,
          quantity: row.quantity,
          category: row.category,
        })),
      };

      return order;
    } catch (error) {
      console.error("Error fetching order details:", error);
      throw new Error("Unable to fetch order details");
    }
  }
  async create(order: IOrderBase): Promise<IOrder> {
    const { products, status, user_id } = order;
    try {
      const sqlQueryOrder =
        "INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *";
      const connect = await db.connect();
      const resultOrder = await connect.query(sqlQueryOrder, [user_id, status]);
      const orderId = resultOrder.rows[0].id;
      for (let product of products) {
        const sqlQueryOrderProduct =
          "INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3)";
        await connect.query(sqlQueryOrderProduct, [
          orderId,
          product.product_id,
          product.quantity,
        ]);
      }

      connect.release();
      return resultOrder.rows[0];
    } catch (error) {
      console.log(error);
      throw new Error("Cannot create new order");
    }
  }
  async update(id: number, order: IOrderBase): Promise<IOrder> {
    const { products, status, user_id } = order;
    try {
      const connect = await db.connect();
      const sqlQueryOrder =
        "UPDATE orders SET user_id = $1, status = $2 WHERE id = $3 RETURNING *";
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
          "INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3)";
        await connect.query(sqlQueryOrderProduct, [
          id,
          product.product_id,
          product.quantity,
        ]);
      }
      connect.release();
      return resultOrder.rows[0];
    } catch (error) {
      console.log(error);
      throw new Error("Cannot update current order");
    }
  }

  async delete(id: number): Promise<IOrder> {
    try {
      const connect = await db.connect();
      const sqlQueryOrderProduct =
        "DELETE FROM order_products WHERE order_id = $1";
      await connect.query(sqlQueryOrderProduct, [id]);
      const sqlQueryOrder = "DELETE FROM orders WHERE id = $1 RETURNING *";
      const resultOrder = await connect.query(sqlQueryOrder, [id]);
      connect.release();
      return resultOrder.rows[0];
    } catch (error) {
      console.log(error);
      throw new Error("Cannot delete current order");
    }
  }
}
