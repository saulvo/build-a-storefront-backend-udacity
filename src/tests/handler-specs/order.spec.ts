import { IOrder, IOrderBase, IProduct, IUser } from "@/types";
import supertest from "supertest";
import app from "../../server";

const request = supertest(app);

describe("Order Handler", () => {
  let user: IUser;
  let token: string;
  let product: IProduct;
  let orderBase: IOrderBase;
  let order: IOrder;

  beforeAll(async () => {
    const userResponse = await request.post("/users").send({
      username: "saul2",
      password: "123",
      firstname: "Saul",
      lastname: "Vo",
    });
    user = userResponse.body;

    const loginResponse = await request.post("/login").send({
      username: "saul2",
      password: "123",
    });
    token = loginResponse.body.token;

    const productResponse = await request.post("/products").send({
      name: "product",
      price: 100,
      category: "category",
    });
    product = productResponse.body;

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

  it("should create a new order", async () => {
    const response = await request
      .post("/orders")
      .set("Authorization", `Bearer ${token}`)
      .send(orderBase);
    order = response.body;
    expect(response.status).toBe(200);
    expect(order.id).toBeDefined();
  });

  it("should retrieve the order", async () => {
    const response = await request
      .get(`/orders/${order.id}`)
      .set("Authorization", `Bearer ${token}`);

    const retrievedOrder = response.body;
    expect(response.status).toBe(200);
    expect(retrievedOrder.id).toEqual(order.id);
  });

  it("should update the order", async () => {
    const response = await request
      .put(`/orders/${order.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ ...orderBase, status: true });

    const updatedOrder = response.body;
    expect(response.status).toBe(200);
    expect(updatedOrder.status).toBe(true);
  });

  it("should delete the order", async () => {
    await request
      .delete(`/orders/${order.id}`)
      .set("Authorization", `Bearer ${token}`);

    const response = await request
      .get(`/orders/${order.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
  });

  afterAll(async () => {
    await request.delete(`/users/${user.id}`);
    await request.delete(`/products/${product.id}`);
  });
});
