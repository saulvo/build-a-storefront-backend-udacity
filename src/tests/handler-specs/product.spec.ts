import { IProductBase } from "@/types";
import supertest from "supertest";
import app from "../../server";

const request = supertest(app);

describe("Product Handler", () => {
  let productBase: IProductBase = {
    name: "product",
    price: 100,
    category: "category",
  };
  let productId: number | undefined;

  it("should get the create endpoint", async (done) => {
    const res = await request.post("/products").send(productBase);
    const { id } = res.body;
    productId = id;
    expect(res.status).toBe(200);
    done();
  });

  it("should get the read endpoint", async (done) => {
    const res = await request.get(`/products/${productId}`);
    expect(res.status).toBe(200);
    done();
  });

  it("should get the list endpoint", async (done) => {
    const res = await request.get("/products");
    expect(res.status).toBe(200);
    done();
  });

  it("should get the update endpoint", async (done) => {
    const res = await request.put(`/products/${productId}`).send({
      name: "new product",
      price: 200,
      category: "new category",
    });
    expect(res.status).toBe(200);
    done();
  });

  it("should get the delete endpoint", async (done) => {
    const res = await request.delete(`/products/${productId}`);
    expect(res.status).toBe(200);
    done();
  });
});
