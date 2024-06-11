import { OrderModel, ProductModel, UserModel } from "@/models";
import { IOrder, IOrderBase, IProduct, IUser } from "@/types";

const userModel = new UserModel();
const productModel = new ProductModel();
const orderModel = new OrderModel();

describe("Order Model", () => {
  let user: IUser | undefined;
  let product: IProduct | undefined;
  let orderBase: IOrderBase | undefined;
  let order: IOrder | undefined;

  beforeAll(async () => {
    user = await userModel.create({
      username: "saul",
      password: "123",
      firstname: "Saul",
      lastname: "Vo",
    });
    product = await productModel.create({
      name: "product",
      price: 100,
      category: "category",
    });
    orderBase = {
      products: [
        {
          product_id: product.id,
          quantity: 1,
        },
      ],
      user_id: user.id,
      status: false,
    };
  });

  afterAll(async () => {
    if (user) {
      await userModel.delete(user.id);
      user = undefined;
    }
    if (product) {
      await productModel.delete(product.id);
      product = undefined;
    }
    orderBase = undefined;
  });

  it("should have a show method", () => {
    expect(orderModel.getAll).toBeDefined();
  });

  it("should have a get method", () => {
    expect(orderModel.get).toBeDefined();
  });

  it("should have a add method", () => {
    expect(orderModel.create).toBeDefined();
  });

  it("should have a update method", () => {
    expect(orderModel.update).toBeDefined();
  });

  it("should have a delete method", () => {
    expect(orderModel.delete).toBeDefined();
  });

  it("should add a order", async () => {
    if (!user || !product) {
      throw new Error("User or Product is not created");
    }
    if (!orderBase) {
      throw new Error("Order base is not created");
    }
    const createdOrder = await orderModel.create(orderBase);
    order = createdOrder;
    expect(createdOrder.id).toBeDefined();
  });

  it("should return a list of orders", async () => {
    const orders = await orderModel.getAll();
    expect(orders.length).toBeGreaterThan(0);
  });

  it("should update the order", async () => {
    if (!order) {
      throw new Error("Order is not created");
    }
    if (!orderBase) {
      throw new Error("Order base is not created");
    }
    const updatedOrder = await orderModel.update(order.id, {
      ...orderBase,
      status: true,
    });
    expect(updatedOrder.status).toBe(true);
  });

  it("should delete a order", async () => {
    if (!order) {
      throw new Error("Order is not created");
    }
    const deletedOrder = await orderModel.delete(order.id);
    expect(deletedOrder.id).toBe(order.id);
  });
});
