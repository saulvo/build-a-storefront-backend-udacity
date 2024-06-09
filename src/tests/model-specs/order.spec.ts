import { OrderModel, ProductModel, UserModel } from "@/models";
import { BaseOrder } from "@/types";

const orderModel = new OrderModel();
const userModel = new UserModel();
const productModel = new ProductModel();

describe("Order Model", () => {
  const userStore = new UserModel();
  const productStore = new ProductModel();

  let order: BaseOrder, user_id: number, product_id: number;

  function createOrder(order: BaseOrder) {
    return orderModel.create(order);
  }

  function deleteOrder(id: number) {
    return orderModel.delete(id);
  }

  beforeAll(async () => {
    const user = await userModel.create({
      username: "saul",
      firstname: "Saul",
      lastname: "Vo",
      password: "Ab123!@#",
    });

    user_id = user.id;

    const product = await productModel.create({
      name: "iPhone 15",
      price: 2000,
      category: "phones",
    });

    product_id = product.id;

    order = {
      products: [
        {
          product_id: product.id,
          quantity: 5,
        },
      ],
      user_id,
      status: true,
    };
  });

  afterAll(async () => {
    await userStore.delete(user_id);
    await productStore.delete(product_id);
  });

  it("should have an index method", () => {
    expect(orderModel.get).toBeDefined();
  });

  it("should have a show method", () => {
    expect(orderModel.get).toBeDefined();
  });

  it("should have a add method", () => {
    expect(orderModel.create).toBeDefined();
  });

  it("should have a delete method", () => {
    expect(orderModel.delete).toBeDefined();
  });

  it("should add a order", async () => {
    const createdOrder = await createOrder(order);
    expect(createdOrder).toEqual({
      id: createdOrder.id,
      ...order,
    });

    await deleteOrder(createdOrder.id);
  });

  it("should return a list of orders", async () => {
    const createdOrder = await createOrder(order);
    const orderList = await orderModel.getAll();
    expect(orderList).toEqual([createdOrder]);
    await deleteOrder(createdOrder.id);
  });

  it("should update the order", async () => {
    const createdOrder = await createOrder(order);
    const orderData: BaseOrder = {
      products: [
        {
          product_id,
          quantity: 20,
        },
      ],
      user_id,
      status: false,
    };
    const { products, status } = await orderModel.update(
      createdOrder.id,
      orderData,
    );
    expect(products).toEqual(orderData.products);
    expect(status).toEqual(orderData.status);
    await deleteOrder(createdOrder.id);
  });

  it("should remove the order item", async () => {
    const createdOrder = await createOrder(order);
    await deleteOrder(createdOrder.id);
    const orderList = await orderModel.getAll();
    expect(orderList).toEqual([]);
  });
});
