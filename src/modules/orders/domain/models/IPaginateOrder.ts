import { IOrder } from './IOrder';

export interface IPaginateOrder {
  perPage: number;
  total: number;
  currentPage: number;
  data: IOrder[];
}
