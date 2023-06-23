import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { ICreateOrderProducts } from './ICreateOrderProducts';

export interface IOrder {
  id: string;
  customer: ICustomer;
  orderProducts: ICreateOrderProducts[];
  createdAt: Date;
  updatedAt: Date;
}
