import { ICreateUser } from '../models/ICreateUser';
import { IPaginateUser } from '../models/IPaginateUser';
import { IUser } from '../models/IUser';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export interface IUsersRepository {
  findAll({ page, skip, take }: SearchParams): Promise<IPaginateUser>;
  findById(name: string): Promise<IUser | undefined>;
  findByName(name: string): Promise<IUser | undefined>;
  findByEmail(email: string): Promise<IUser | undefined>;
  create(data: ICreateUser): Promise<IUser>;
  save(user: IUser): Promise<IUser>;
}
