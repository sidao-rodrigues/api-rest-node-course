import { container } from 'tsyringe';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import { ICUstomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';

container.registerSingleton<ICUstomersRepository>(
  'CustomersRepository',
  CustomersRepository,
);
