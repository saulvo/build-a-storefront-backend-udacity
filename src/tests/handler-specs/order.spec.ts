import { IOrder, IOrderBase, IProduct, IUser } from "@/types";
import supertest from "supertest";
import app from "../../server";

const request = supertest(app);

describe("Order Handler", () => {
  let user: IUser | undefined;
  let userToken: string | undefined;
  let product: IProduct | undefined;
  let orderBase: IOrderBase | undefined;
  let order: IOrder | undefined;

  beforeAll(async () => {
    const { body: userCreate } = await request.post("/users").send({
      username: "saul",
      password: "123",
      firstname: "Saul",
      lastname: "Vo",
    });
    const { body: bodyAuth } = await request.post("/login").send({
      username: "saul",
      password: "123",
    });
    user = userCreate;
    userToken = bodyAuth.token;
    const { body: productCreate } = await request.post("/products").send({
      name: "product",
      price: 100,
      category: "category",
    });
    product = productCreate;
    orderBase = {
      products: [
        {
          product_id: productCreate.id,
          quantity: 1,
        },
      ],
      user_id: userCreate.id,
      status: false,
    };
  });
  afterAll(async () => {
    if (user) {
      await request
        .delete(`/users/${user.id}`)
        .set("Authorization", `Bearer ${userToken}`);
      user = undefined;
    }
    if (product) {
      await request.delete(`/products/${product.id}`);
      product = undefined;
    }
    orderBase = undefined;
  });

  it("should get the create endpoint", async () => {
    const res = await request
      .post("/orders")
      .set("Authorization", `Bearer ${userToken}`)
      .send(orderBase);
    order = res.body;
    expect(res.status).toBe(200);
  });

  it("should get the read endpoint", async () => {
    if (!order) {
      throw new Error("Order base is not created");
    }
    const res = await request
      .get(`/orders/${order.id}`)
      .set("Authorization", `Bearer ${userToken}`);
    expect(res.status).toBe(200);
  });

  it("should get the list endpoint", async () => {
    const res = await request
      .get("/orders")
      .set("Authorization", `Bearer ${userToken}`);
    expect(res.status).toBe(200);
  });

  it("should get the update endpoint", async () => {
    if (!order) {
      throw new Error("Order base is not created");
    }
    const res = await request
      .put(`/orders/${order.id}}`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        ...orderBase,
        status: true,
      });
    expect(res.status).toBe(200);
  });

  it("should get the delete endpoint", async () => {
    if (!order) {
      throw new Error("Order base is not created");
    }
    const res = await request
      .delete(`/orders/${order.id}}`)
      .set("Authorization", `Bearer ${userToken}`);
    expect(res.status).toBe(200);
  });
});
