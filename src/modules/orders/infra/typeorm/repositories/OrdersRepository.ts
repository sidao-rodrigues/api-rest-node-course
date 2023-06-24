import { dataSource } from '@shared/infra/typeorm/index';
import { Repository } from 'typeorm';
import Order from '../entities/Order';
import {
  IOrdersRepository,
  SearchParams,
} from '@modules/orders/domain/repositories/IOrdersRepository';
import { IPaginateOrder } from '@modules/orders/domain/models/IPaginateOrder';
import { ICreateOrder } from '@modules/orders/domain/models/ICreateOrder';

class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Order);
  }

  public async findById(id: string): Promise<Order | null> {
    const order = await this.ormRepository.findOne({
      where: { id },
      relations: ['orderProducts', 'customer'],
    });
    return order;
  }

  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<IPaginateOrder> {
    const [orders, count] = await this.ormRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      perPage: take,
      total: count,
      currentPage: page,
      data: orders,
    };

    return result;
  }

  public async create({ customer, products }: ICreateOrder): Promise<Order> {
    const order = this.ormRepository.create({
      customer,
      orderProducts: products,
    });

    await this.ormRepository.save(order);

    return order;
  }
}

export default OrdersRepository;
