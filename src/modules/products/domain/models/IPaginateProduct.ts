import { IProduct } from './IProduct';

export interface IPaginateProduct {
  perPage: number;
  total: number;
  currentPage: number;
  data: IProduct[];
}
