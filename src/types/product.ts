export interface IProductBase {
  name: string;
  price: number;
  category: string;
}

export interface IProduct extends IProductBase {
  id: number;
}
