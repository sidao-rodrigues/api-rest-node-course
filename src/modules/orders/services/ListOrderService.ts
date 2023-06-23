import { inject, injectable } from 'tsyringe';
import OrdersRepository from '../infra/typeorm/repositories/OrdersRepository';
import { IPaginateOrder } from '../domain/models/IPaginateOrder';

type SearchParams = {
  page: number;
  limit: number;
};

@injectable()
class ListOrderService {
  constructor(
    @inject('OrdersRepository') private ordersRepository: OrdersRepository,
  ) {}

  public async execute({ page, limit }: SearchParams): Promise<IPaginateOrder> {
    const take = limit;
    const skip = (Number(page) - 1) * take;

    const orders = await this.ordersRepository.findAll({ page, skip, take });

    return orders;
  }
}

export default ListOrderService;
