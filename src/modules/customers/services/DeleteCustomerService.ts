import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
}

class DeleteCustomerService {
  public async execute({ id }: IRequest): Promise<void> {
    const customersRespository = getCustomRepository(CustomersRepository);

    const customer = await customersRespository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.', 404);
    }

    await customersRespository.remove(customer);
  }
}

export default DeleteCustomerService;
