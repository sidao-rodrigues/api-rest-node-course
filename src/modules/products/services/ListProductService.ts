// import RedisCache from '@shared/cache/RedisCache';
import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IPaginateProduct } from '../domain/models/IPaginateProduct';

type SearchParms = {
  page: number;
  limit: number;
};

@injectable()
class ListProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}
  public async execute({
    page,
    limit,
  }: SearchParms): Promise<IPaginateProduct> {
    // const redisCache = new RedisCache();

    //implementação antiga, refazer com redis
    // let products = await RedisCache.recover<Product[]>(
    //   'api-vendas-PRODUCT_LIST',
    // );

    // if (!products) {
    //   products = await this.productsRepository.SearchParms();
    //   await RedisCache.save<Product[]>('api-vendas-PRODUCT_LIST', products);
    // }

    const take = limit;
    const skip = (Number(page) - 1) * take;
    const products = await this.productsRepository.findAll({
      page,
      skip,
      take,
    });

    return products;
  }
}

export default ListProductService;
