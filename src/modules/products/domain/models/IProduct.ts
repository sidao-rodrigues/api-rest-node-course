import { IOrderProducts } from '@modules/orders/domain/models/IOrderProducts';

export interface IProduct {
  id: string;
  orderProducts?: IOrderProducts[];
  name: string;
  price: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}
