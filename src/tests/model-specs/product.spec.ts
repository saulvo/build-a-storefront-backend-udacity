import { ProductModel } from "@/models";
import { IProduct, IProductBase } from "@/types";

const productModel = new ProductModel();

describe("Product Model", () => {
  let productBase: IProductBase = {
    name: "product",
    price: 100,
    category: "category",
  };
  let product: IProduct | undefined;

  afterAll(async () => {
    if (product) {
      await productModel.delete(product.id);
      product = undefined;
    }
  });

  it("should have a show method", () => {
    expect(productModel.getAll).toBeDefined();
  });
  it("should have a get method", () => {
    expect(productModel.get).toBeDefined();
  });
  it("should have a add method", () => {
    expect(productModel.create).toBeDefined();
  });
  it("should have a update method", () => {
    expect(productModel.update).toBeDefined();
  });
  it("should have a delete method", () => {
    expect(productModel.delete).toBeDefined();
  });

  it("should add a product", async () => {
    const newProduct = await productModel.create(productBase);
    product = newProduct;
    expect(newProduct).toBeDefined();
  });

  it("should return a list of products", async () => {
    const products = await productModel.getAll();
    expect(products).toBeDefined();
  });

  it("should update the product", async () => {
    const updatedProduct = await productModel.update(product!.id, {
      name: "new product",
      price: 200,
      category: "new category",
    });
    expect(updatedProduct).toBeDefined();
  });

  it("should delete a product", async () => {
    if (!product) {
      throw new Error("Product is not defined");
    }
    const deletedProduct = await productModel.delete(product.id);
    expect(deletedProduct).toBeDefined();
  });
});
