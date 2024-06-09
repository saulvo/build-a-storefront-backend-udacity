import { OrderModel, ProductModel, UserModel } from "@/models";
import { IOrder, IProduct, IUser } from "@/types";

const userModel = new UserModel();
const productModel = new ProductModel();
const orderModel = new OrderModel();

describe("Order Model", () => {
  let user: IUser | undefined;
  let product: IProduct | undefined;
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
  });

  afterAll(async () => {
    // if (user) {
    //   await userModel.delete(user.id);
    //   user = undefined;
    // }
    // if (product) {
    //   await productModel.delete(product.id);
    //   product = undefined;
    // }
  });

  it("should have a show method", () => {
    expect(orderModel.getAll).toBeDefined();
  });
  it("should have a add method", () => {
    expect(orderModel.create).toBeDefined();
  });
  it("should have a delete method", () => {
    expect(orderModel.delete).toBeDefined();
  });
  it("should add a order", async () => {
    if (!user || !product) {
      throw new Error("User or Product is not created");
    }

    const orderBase = {
      products: [
        {
          product_id: product.id,
          quantity: 1,
        },
      ],
      user_id: user.id,
      status: true,
    };
    const createdOrder = await orderModel.create(orderBase);
    order = createdOrder;
    expect(createdOrder.id).toBeDefined();
  });
});
