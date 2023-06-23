import { ICreateProduct } from '../models/ICreateProduct';
import { IFindProducts } from '../models/IFindProducts';
import { IPaginateProduct } from '../models/IPaginateProduct';
import { IProduct } from '../models/IProduct';
import { IUpdateStockProduct } from '../models/IUpdateStockProduct';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export interface IProductsRepository {
  findByName(name: string): Promise<IProduct | undefined>;
  findById(id: string): Promise<IProduct | undefined>;
  findAll({ page, skip, take }: SearchParams): Promise<IPaginateProduct>;
  findAllByIds(products: IFindProducts[]): Promise<IProduct[]>;
  create(data: ICreateProduct): Promise<IProduct>;
  save(product: IProduct): Promise<IProduct>;
  updateStock(product: IUpdateStockProduct[]): Promise<void>;
  remove(product: IProduct): Promise<void>;
}
