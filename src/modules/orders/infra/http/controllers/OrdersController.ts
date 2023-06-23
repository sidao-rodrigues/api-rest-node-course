import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateOrderService from '@modules/orders/services/CreateOrderService';
import ShowOrderService from '@modules/orders/services/ShowOrderService';
import ListOrderService from '@modules/orders/services/ListOrderService';

export default class OrdersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const page = request.query.page ? Number(request.query.page) : 1;
    const limit = request.query.limit ? Number(request.query.limit) : 15;

    const listOrder = container.resolve(ListOrderService);

    const orders = await listOrder.execute({ page, limit });

    return response.json(orders);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showOrder = container.resolve(ShowOrderService);

    const order = await showOrder.execute({ id });

    return response.json(order);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { customerId, products } = request.body;

    const createOrder = container.resolve(CreateOrderService);

    const order = await createOrder.execute({ customerId, products });

    return response.status(201).json(order);
  }
}
