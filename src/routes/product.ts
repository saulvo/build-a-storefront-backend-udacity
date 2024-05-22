interface IProductCreate {
  name: string;
  price: string;
  category: string;
}
export interface IProduct extends IProductCreate {
  id: string;
  name: string;
  price: string;
  category: string;
}

export class ProductModel {
  async getAll(): Promise<IProduct[]> {
    return [];
  }

  async create(product: IProductCreate): Promise<IProduct> {
    return { ...product, id: "1" };
  }

  async getById(id: string): Promise<IProduct | null> {
    return null;
  }

  async update(id: string, product: IProductCreate): Promise<IProduct | null> {
    return null;
  }

  async delete(id: string): Promise<IProduct | null> {
    return null;
  }
}
