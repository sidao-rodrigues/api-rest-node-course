import { ICreateOrder } from '../models/ICreateOrder';
import { IOrder } from '../models/IOrder';
import { IPaginateOrder } from '../models/IPaginateOrder';

export type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export interface IOrdersRepository {
  findById(id: string): Promise<IOrder | null>;
  findAll({ page, skip, take }: SearchParams): Promise<IPaginateOrder>;
  create(data: ICreateOrder): Promise<IOrder>;
}
