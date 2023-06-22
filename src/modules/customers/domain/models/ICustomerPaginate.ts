import { ICustomer } from './ICustomer';

export interface ICustomerPaginate {
  perPage: number;
  total: number;
  currentPage: number;
  data: ICustomer[];
}
