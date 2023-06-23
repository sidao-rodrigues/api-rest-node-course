import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import OrdersRepository from '../infra/typeorm/repositories/OrdersRepository';
import { IShowOrder } from '../domain/models/IShowOrder';
import { IOrder } from '../domain/models/IOrder';

@injectable()
class ShowOrderService {
  constructor(
    @inject('OrdersRepository') private ordersRepository: OrdersRepository,
  ) {}

  public async execute({ id }: IShowOrder): Promise<IOrder> {
    const order = await this.ordersRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found.', 404);
    }

    return order;
  }
}

export default ShowOrderService;
