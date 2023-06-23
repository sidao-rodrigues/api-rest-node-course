import { IUser } from './IUser';

export interface IPaginateUser {
  perPage: number;
  total: number;
  currentPage: number;
  data: IUser[];
}
