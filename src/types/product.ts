export interface IProductCreate {
  name: string;
  price: string;
  category: string;
}

export interface IProduct extends IProductCreate {
  id: string;
}
