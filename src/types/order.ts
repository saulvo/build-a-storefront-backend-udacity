export interface OrderProduct {
  product_id: number;
  quantity: number;
}

export interface BaseOrder {
  products: OrderProduct[];
  user_id: number;
  status: boolean;
}

export interface IOrder extends BaseOrder {
  id: number;
}

export interface IOrderDetail {
  id: number;
  status: true;
  user: {
    id: number;
    firstname: string;
    lastname: string;
  };
  products: {
    name: string;
    price: number;
    quantity: number;
    category: string;
  }[];
}
