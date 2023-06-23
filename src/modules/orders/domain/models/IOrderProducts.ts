import { IProduct } from '@modules/products/domain/models/IProduct';
import { IOrder } from './IOrder';

export interface IOrderProducts {
  id: string;
  order: IOrder;
  product: IProduct;
  price: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}
