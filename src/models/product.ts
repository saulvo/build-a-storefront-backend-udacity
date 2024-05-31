import { IProduct } from "@/types";
export class ProductModel {
  async getAll(): Promise<IProduct[]> {
    return [];
  }
  async get(id: string): Promise<IProduct> {
    return {} as IProduct;
  }
  async create(product: IProduct): Promise<IProduct> {
    return product;
  }
  async update(id: string, product: IProduct): Promise<IProduct> {
    return product;
  }
  async delete(id: string): Promise<IProduct> {
    return {} as IProduct;
  }
}
